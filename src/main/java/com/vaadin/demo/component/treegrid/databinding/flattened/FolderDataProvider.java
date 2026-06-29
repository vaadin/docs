package com.vaadin.demo.component.treegrid.databinding.flattened;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
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
     * Indicates that this data provider uses the flattened hierarchy format.
     */
    @Override
    public HierarchyFormat getHierarchyFormat() {
        return HierarchyFormat.FLATTENED;
    }

    /**
     * Returns whether the given folder has child folders.
     */
    @Override
    public boolean hasChildren(Folder folder) {
        return folderTreeData.getChildren(folder).size() > 0;
    }

    /**
     * Returns the flattened sub-tree of the requested parent folder based on
     * the expanded folders.
     */
    @Override
    public Stream<Folder> fetchChildren(HierarchicalQuery<Folder, Void> query) {
        List<Folder> result = flatten(query.getParent(),
                query.getExpandedItemIds());

        return result.stream().skip(query.getOffset()).limit(query.getLimit());
    }

    /**
     * Returns the size of the flattened sub-tree of the requested parent folder
     * based on the expanded folders.
     */
    @Override
    public int getChildCount(HierarchicalQuery<Folder, Void> query) {
        List<Folder> result = flatten(query.getParent(),
                query.getExpandedItemIds());

        return result.size();
    }

    /**
     * Returns the depth of the given folder in the hierarchy for Tree Grid to
     * apply the correct indentation.
     */
    @Override
    public int getDepth(Folder folder) {
        int depth = 0;
        while ((folder = folderTreeData.getParent(folder)) != null) {
            depth++;
        }
        return depth;
    }

    /**
     * Builds the parent folder's sub-tree based on the provided expanded
     * folders. The result is a flat list of folders in depth-first order.
     */
    private List<Folder> flatten(Folder parent, Set<Object> expandedFolderIds) {
        List<Folder> result = new ArrayList<>();
        List<Folder> children = folderTreeData.getChildren(parent);

        for (Folder child : children) {
            result.add(child);

            var isExpanded = expandedFolderIds.contains(getId(child));
            if (isExpanded) {
                result.addAll(flatten(child, expandedFolderIds));
            }
        }

        return result;
    }
}
// end::body[]
