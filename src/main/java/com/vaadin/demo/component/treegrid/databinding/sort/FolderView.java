package com.vaadin.demo.component.treegrid.databinding.sort;

import com.vaadin.demo.component.treegrid.databinding.Folder;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.treegrid.TreeGrid;

// tag::body[]
public class FolderView extends VerticalLayout {
    public FolderView() {
        TreeGrid<Folder> treeGrid = new TreeGrid<>();
        treeGrid.addHierarchyColumn(Folder::name).setHeader("Folder")
                .setKey("name").setSortable(true);

        treeGrid.setDataProvider(new FolderDataProvider());

        add(treeGrid);
    }
}
// end::body[]
