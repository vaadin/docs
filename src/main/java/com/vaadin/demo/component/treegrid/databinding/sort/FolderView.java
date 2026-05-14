package com.vaadin.demo.component.treegrid.databinding.sort;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.component.treegrid.databinding.Folder;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.treegrid.TreeGrid;

public class FolderView extends Div {
    public FolderView() {
        // tag::body[]
        TreeGrid<Folder> treeGrid = new TreeGrid<>();
        treeGrid.addHierarchyColumn(Folder::name).setHeader("Folder")
                .setKey("name").setSortable(true);
        treeGrid.setDataProvider(new FolderDataProvider());
        add(treeGrid);
        // end::body[]
    }

    public static class Exporter extends DemoExporter<FolderView> { // hidden-source-line
    } // hidden-source-line
}
