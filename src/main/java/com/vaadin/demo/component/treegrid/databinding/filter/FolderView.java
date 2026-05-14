package com.vaadin.demo.component.treegrid.databinding.filter;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.component.treegrid.databinding.Folder;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.treegrid.TreeGrid;
import com.vaadin.flow.data.provider.hierarchy.HierarchicalConfigurableFilterDataProvider;
import com.vaadin.flow.data.value.ValueChangeMode;

public class FolderView extends Div {
    public FolderView() {
        // tag::body[]
        TreeGrid<Folder> treeGrid = new TreeGrid<>();
        treeGrid.addHierarchyColumn(Folder::name).setHeader("Folder");

        // Wrap the data provider so the filter can be set externally.
        // @formatter:off hidden-source-line
        HierarchicalConfigurableFilterDataProvider<Folder, Void, String> folderDataProvider =
                new FolderDataProvider().withConfigurableFilter();
        // @formatter:on hidden-source-line

        treeGrid.setDataProvider(folderDataProvider);

        TextField searchInput = new TextField("Search folders",
                "Enter folder name");
        searchInput.setValueChangeMode(ValueChangeMode.EAGER);
        searchInput.addValueChangeListener(
                event -> folderDataProvider.setFilter(event.getValue()));

        add(searchInput, treeGrid);
        // end::body[]
    }

    public static class Exporter extends DemoExporter<FolderView> { // hidden-source-line
    } // hidden-source-line
}
