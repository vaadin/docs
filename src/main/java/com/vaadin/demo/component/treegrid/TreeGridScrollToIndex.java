package com.vaadin.demo.component.treegrid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
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

    private Map<Person, List<Integer>> personToIndexAddress = new HashMap<>();
    TreeGrid<Person> treeGrid = new TreeGrid<>();

    public TreeGridScrollToIndex() {

        treeGrid.setDataProvider(new LazyLoadingProvider());
        
        treeGrid.setUniqueKeyDataGenerator("key", (person) -> {
            return String.valueOf(person.getId());
        });

        treeGrid.expand(DataService.getManagers());

        treeGrid.addHierarchyColumn(Person::getFirstName)
                .setHeader("First name");

        treeGrid.addSelectionListener(e -> {
            if (e.getFirstSelectedItem().isPresent()) {
                var person = e.getFirstSelectedItem().get();
                var indexAddress = personToIndexAddress.get(person);
                if (indexAddress != null) {
                    parentIndexField.setValue(indexAddress.get(0));
                    if (indexAddress.size() > 1) {
                        childIndexField.setValue(indexAddress.get(1));
                    }
                }
            }
        });

        
        treeGrid.addColumn(person -> StringUtils.join(personToIndexAddress.get(person), ", "))
                .setHeader("Index");
        treeGrid.addColumn(Person::getEmail).setHeader("Email");

        add(treeGrid);

        var controls = new HorizontalLayout();
        parentIndexField.setValue(13);
        childIndexField.setValue(6);
        parentIndexField.addValueChangeListener(e -> updateSelectedItem());
        childIndexField.addValueChangeListener(e -> updateSelectedItem());
        controls.add(parentIndexField);
        controls.add(childIndexField);

        var scrollToIndexButton = new Button("Scroll to index", e -> {
            var parentIndex = parentIndexField.getValue();
            var childIndex = childIndexField.getValue();
            // tag::snippet[]
            treeGrid.scrollToIndex(parentIndex, childIndex);
            // end::snippet[]
        });
        controls.add(scrollToIndexButton);

        add(controls);
    }

    private void updateSelectedItem() {
        treeGrid.select(null);
        var parentIndex = parentIndexField.getValue();
        var childIndex = childIndexField.getValue();
        personToIndexAddress.entrySet().stream().filter(entry -> {
            var indexes = entry.getValue();
            return indexes.size() == 2
                    && List.of(parentIndex, childIndex).equals(indexes);
        }).findFirst().ifPresent(entry -> {
            treeGrid.select(entry.getKey());
        });
    }

    public List<Person> getStaff(Person manager) {
        return DataService.getPeople(manager.getId());
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
                people = getStaff(query.getParent());
            }

            int limit = query.getLimit();
            int offset = query.getOffset();

            var personIndex = new AtomicInteger(0);
            people.stream().skip(offset).limit(limit).forEach(person -> {
                var index = offset + personIndex.getAndIncrement();
                var parentIndexAddress = personToIndexAddress
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
            return getStaff(item).size() > 0;
        }

        @Override
        public boolean isInMemory() {
            return false;
        }
    }

    public static class Exporter extends DemoExporter<TreeGridScrollToIndex> { // hidden-source-line
    } // hidden-source-line
}
