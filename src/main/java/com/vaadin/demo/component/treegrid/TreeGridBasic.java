package com.vaadin.demo.component.treegrid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.treegrid.TreeGrid;
import com.vaadin.flow.data.provider.hierarchy.HierarchicalDataProvider.HierarchyFormat;
import com.vaadin.flow.data.provider.hierarchy.TreeData;
import com.vaadin.flow.data.provider.hierarchy.TreeDataProvider;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("tree-grid-basic")
public class TreeGridBasic extends Div {

    private List<Person> managers = DataService.getManagers();

    public TreeGridBasic() {
        // tag::snippet[]
        TreeGrid<Person> treeGrid = new TreeGrid<>();
        TreeData<Person> treeData = new TreeData<>();
        treeData.addItems(managers, this::getStaff);
        treeGrid.setDataProvider(
                new TreeDataProvider<>(treeData, HierarchyFormat.FLATTENED));
        treeGrid.addHierarchyColumn(Person::getFirstName)
                .setHeader("First name");
        treeGrid.addColumn(Person::getLastName).setHeader("Last name");
        treeGrid.addColumn(Person::getEmail).setHeader("Email");
        // end::snippet[]
        add(treeGrid);
    }

    public List<Person> getStaff(Person manager) {
        return DataService.getPeople(manager.getId());
    }

    public static class Exporter extends DemoExporter<TreeGridBasic> { // hidden-source-line
    } // hidden-source-line
}
