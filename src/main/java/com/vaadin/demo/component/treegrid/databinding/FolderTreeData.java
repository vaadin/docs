package com.vaadin.demo.component.treegrid.databinding;

import com.vaadin.flow.data.provider.hierarchy.TreeData;

// tag::body[]
public class FolderTreeData extends TreeData<Folder> {
    public FolderTreeData() {
        // Creates a TreeData object with the following folder hierarchy:
        //
        // @formatter:off hidden-source-line
        // ├── Work
        // │   └── Documents
        // │       └── Invoices
        // └── Family
        // @formatter:on hidden-source-line

        Folder work = new Folder("Work");
        Folder documents = new Folder("Documents");
        Folder invoices = new Folder("Invoices");
        Folder family = new Folder("Family");

        addRootItems(work, family);
        addItem(work, documents);
        addItem(documents, invoices);
    }
}
// end::body[]
