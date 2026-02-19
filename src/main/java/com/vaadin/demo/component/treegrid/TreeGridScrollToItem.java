package com.vaadin.demo.component.treegrid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.treegrid.TreeGrid;
import com.vaadin.flow.data.provider.hierarchy.TreeData;
import com.vaadin.flow.data.provider.hierarchy.TreeDataProvider;
import com.vaadin.flow.router.Route;

import java.util.ArrayList;
import java.util.List;

@Route("tree-grid-scroll-to-item")
public class TreeGridScrollToItem extends Div {
    private final TreeGrid<Person> treeGrid = new TreeGrid<>();

    public TreeGridScrollToItem() {
        TreeData<Person> treeData = new TreeData<>();
        treeData.addItems(DataService.getManagers(),
                manager -> DataService.getPeople(manager.getId()));
        treeGrid.setDataProvider(new TreeDataProvider<>(treeData));
        treeGrid.addHierarchyColumn(Person::getFullName).setWidth("300px")
                .setFlexGrow(0).setHeader("Full name");
        treeGrid.addColumn(Person::getEmail).setHeader("Email");

        add(treeGrid);

        Select<Person> scrollToItem = new Select<>();
        scrollToItem.setLabel("Scroll to item");
        scrollToItem.setItemLabelGenerator(Person::getFullName);
        scrollToItem.setItems(getItemsToScrollTo());
        scrollToItem.setWidth("200px");
        scrollToItem.addValueChangeListener(event -> {
            Person item = event.getValue();
            // tag::snippet[]
            treeGrid.scrollToItem(item);
            // end::snippet[]
        });
        add(scrollToItem);
    }

    private List<Person> getItemsToScrollTo() {
        List<Person> itemsToScrollTo = new ArrayList<>();
        List<Person> managers = DataService.getManagers();
        Person middleRootItem = managers.get(managers.size() / 2);
        itemsToScrollTo.add(middleRootItem);
        List<Person> children = DataService.getPeople(middleRootItem.getId());
        while (!children.isEmpty()) {
            Person middleChild = children.get(children.size() / 2);
            itemsToScrollTo.add(middleChild);
            children = DataService.getPeople(middleChild.getId());
        }
        return itemsToScrollTo;
    }

    public static class Exporter extends DemoExporter<TreeGridScrollToItem> { // hidden-source-line
    } // hidden-source-line
}
