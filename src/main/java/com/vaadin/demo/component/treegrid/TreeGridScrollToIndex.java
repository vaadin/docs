package com.vaadin.demo.component.treegrid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.FlexComponent.Alignment;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.component.treegrid.TreeGrid;
import com.vaadin.flow.data.provider.hierarchy.AbstractHierarchicalDataProvider;
import com.vaadin.flow.data.provider.hierarchy.HierarchicalQuery;
import com.vaadin.flow.router.Route;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Stream;

import org.apache.commons.lang3.StringUtils;

@Route("tree-grid-scroll-to-index")
public class TreeGridScrollToIndex extends Div {

    private IntegerField parentIndexField = new IntegerField("Parent index");
    private IntegerField childIndexField = new IntegerField("Child index");
    private Button scrollToIndexButton = new Button();

    private Map<Person, List<Integer>> personToIndexAddress = new HashMap<>();
    private TreeGrid<Person> treeGrid = new TreeGrid<>();

    public TreeGridScrollToIndex() {
        treeGrid.setDataProvider(new LazyLoadingProvider());

        treeGrid.setUniqueKeyDataGenerator("key", (person) -> {
            return String.valueOf(person.getId());
        });

        treeGrid.expand(DataService.getManagers());

        treeGrid.addHierarchyColumn(Person::getFirstName).setWidth("200px")
                .setFlexGrow(0).setHeader("First name");

        treeGrid.addSelectionListener(e -> {
            if (e.getFirstSelectedItem().isPresent()) {
                Person person = e.getFirstSelectedItem().get();
                List<Integer> indexAddress = personToIndexAddress.get(person);
                if (indexAddress != null) {
                    parentIndexField.setValue(indexAddress.get(0));
                    if (indexAddress.size() > 1) {
                        childIndexField.setValue(indexAddress.get(1));
                    }
                }
            }
        });

        treeGrid.addColumn(person -> StringUtils
                .join(personToIndexAddress.get(person), ", ")).setWidth("80px")
                .setFlexGrow(0).setHeader("Index");
        treeGrid.addColumn(Person::getEmail).setHeader("Email");

        add(treeGrid);

        HorizontalLayout controls = new HorizontalLayout();
        controls.setSpacing(true);
        controls.setAlignItems(Alignment.END);

        parentIndexField.setWidth("120px");
        childIndexField.setWidth("120px");
        parentIndexField.setMin(0);
        childIndexField.setMin(0);
        parentIndexField.setStepButtonsVisible(true);
        childIndexField.setStepButtonsVisible(true);
        parentIndexField.setValue(13);
        childIndexField.setValue(6);
        parentIndexField.addValueChangeListener(e -> updateSelectedItem());
        childIndexField.addValueChangeListener(e -> updateSelectedItem());
        controls.add(parentIndexField);
        controls.add(childIndexField);

        scrollToIndexButton.addClickListener(e -> {
            int[] indexesToScrollTo = { parentIndexField.getValue(),
                    childIndexField.getValue() };
            // tag::snippet[]
            treeGrid.scrollToIndex(indexesToScrollTo);
            // end::snippet[]
        });
        controls.add(scrollToIndexButton);

        add(controls);
    }

    private void updateSelectedItem() {
        treeGrid.select(null);
        Integer parentIndex = parentIndexField.getValue();
        Integer childIndex = childIndexField.getValue();
        personToIndexAddress.entrySet().stream().filter(entry -> {
            List<Integer> indexes = entry.getValue();
            return indexes.size() == 2
                    && List.of(parentIndex, childIndex).equals(indexes);
        }).findFirst().ifPresent(entry -> {
            treeGrid.select(entry.getKey());
        });

        scrollToIndexButton
                .setText("Scroll to index: " + parentIndex + ", " + childIndex);
    }

    private class LazyLoadingProvider
            extends AbstractHierarchicalDataProvider<Person, Void> {

        @Override
        public int getChildCount(HierarchicalQuery<Person, Void> query) {
            return (int) this.fetchChildren(query).count();
        }

        @Override
        public Stream<Person> fetchChildren(
                HierarchicalQuery<Person, Void> query) {
            List<Person> people;
            if (query.getParent() == null) {
                people = DataService.getManagers();
            } else {
                people = DataService.getPeople(query.getParent().getId());
            }

            int limit = query.getLimit();
            int offset = query.getOffset();

            // Cache the index address of each person for demo purposes
            AtomicInteger personIndex = new AtomicInteger(0);
            people.stream().skip(offset).limit(limit).forEach(person -> {
                int index = offset + personIndex.getAndIncrement();
                List<Integer> parentIndexAddress = personToIndexAddress
                        .get(query.getParent());
                List<Integer> indexAddress = parentIndexAddress == null
                        ? List.of(index)
                        : List.of(parentIndexAddress.get(0), index);
                personToIndexAddress.put(person, indexAddress);
            });
            updateSelectedItem();

            return people.stream().skip(offset).limit(limit);
        }

        @Override
        public boolean hasChildren(Person item) {
            return DataService.getPeople(item.getId()).size() > 0;
        }

        @Override
        public boolean isInMemory() {
            return false;
        }
    }

    public static class Exporter extends DemoExporter<TreeGridScrollToIndex> { // hidden-source-line
    } // hidden-source-line
}
