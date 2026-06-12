package com.vaadin.demo.component.treegrid.databinding.filter;

import com.vaadin.demo.component.treegrid.databinding.Folder;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.treegrid.TreeGrid;
import com.vaadin.flow.data.provider.hierarchy.HierarchicalConfigurableFilterDataProvider;
import com.vaadin.flow.data.value.ValueChangeMode;

// tag::body[]
public class FolderView extends VerticalLayout {
    public FolderView() {
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
    }
}
// end::body[]
