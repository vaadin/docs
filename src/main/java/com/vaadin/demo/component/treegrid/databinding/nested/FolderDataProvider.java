package com.vaadin.demo.component.treegrid.databinding.nested;

import java.util.List;
import java.util.stream.Stream;

import com.vaadin.demo.component.treegrid.databinding.Folder;
import com.vaadin.demo.component.treegrid.databinding.FolderTreeData;
import com.vaadin.flow.data.provider.hierarchy.AbstractHierarchicalDataProvider;
import com.vaadin.flow.data.provider.hierarchy.HierarchicalQuery;

// tag::body[]
public class FolderDataProvider
        extends AbstractHierarchicalDataProvider<Folder, Void> {
    private FolderTreeData folderTreeData = new FolderTreeData();

    /**
     * Indicates that this data provider uses an in-memory data source.
     */
    @Override
    public boolean isInMemory() {
        return true;
    }

    /**
     * Indicates that this data provider uses the nested hierarchy format. This
     * is also the default value, so this method override can be omitted.
     */
    @Override
    public HierarchyFormat getHierarchyFormat() {
        return HierarchyFormat.NESTED;
    }

    /**
     * Returns whether the given folder has child folders.
     */
    @Override
    public boolean hasChildren(Folder folder) {
        return folderTreeData.getChildren(folder).size() > 0;
    }

    /**
     * Returns the direct children of the requested parent folder. The query
     * object also includes parameters for sorting and filtering, which can be
     * applied here if needed.
     */
    @Override
    public Stream<Folder> fetchChildren(HierarchicalQuery<Folder, Void> query) {
        List<Folder> children = folderTreeData.getChildren(query.getParent());

        return children.stream().skip(query.getOffset())
                .limit(query.getLimit());
    }

    /**
     * Returns the number of direct children of the requested parent folder. The
     * query object also includes parameters for filtering, which can be applied
     * here if needed.
     */
    @Override
    public int getChildCount(HierarchicalQuery<Folder, Void> query) {
        List<Folder> children = folderTreeData.getChildren(query.getParent());

        return children.size();
    }
}
// end::body[]
