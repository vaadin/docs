package com.vaadin.demo.component.treegrid.databinding.filter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Stream;

import com.vaadin.demo.component.treegrid.databinding.Folder;
import com.vaadin.demo.component.treegrid.databinding.FolderTreeData;
import com.vaadin.flow.data.provider.hierarchy.AbstractHierarchicalDataProvider;
import com.vaadin.flow.data.provider.hierarchy.HierarchicalQuery;

// tag::body[]
public class FolderDataProvider
        extends AbstractHierarchicalDataProvider<Folder, String> {
    private FolderTreeData folderTreeData = new FolderTreeData();

    @Override
    public HierarchyFormat getHierarchyFormat() {
        return HierarchyFormat.FLATTENED;
    }

    /* ... standard overrides of isInMemory(), hasChildren(), getDepth() ... */
    // end::body[]

    @Override
    public boolean isInMemory() {
        return true;
    }

    @Override
    public boolean hasChildren(Folder folder) {
        return folderTreeData.getChildren(folder).size() > 0;
    }

    @Override
    public int getDepth(Folder folder) {
        int depth = 0;
        while ((folder = folderTreeData.getParent(folder)) != null) {
            depth++;
        }
        return depth;
    }
    // tag::body[]

    @Override
    public Stream<Folder> fetchChildren(
            HierarchicalQuery<Folder, String> query) {
        // @formatter:off hidden-source-line
        List<Folder> result = flatten(
                query.getParent(),
                query.getExpandedItemIds(),
                query.getFilter());
        // @formatter:on hidden-source-line

        return result.stream().skip(query.getOffset()).limit(query.getLimit());
    }

    @Override
    public int getChildCount(HierarchicalQuery<Folder, String> query) {
        // @formatter:off hidden-source-line
        List<Folder> result = flatten(
                query.getParent(),
                query.getExpandedItemIds(),
                query.getFilter());
        // @formatter:on hidden-source-line

        return result.size();
    }

    private List<Folder> flatten(Folder parent, Set<Object> expandedFolderIds,
            Optional<String> filter) {
        List<Folder> result = new ArrayList<>();
        List<Folder> children = folderTreeData.getChildren(parent);

        for (Folder child : children) {
            List<Folder> descendants = Collections.emptyList();

            // Recurse when expanded, or when filtering, since a collapsed
            // folder must still be included if any descendant matches.
            var isExpanded = expandedFolderIds.contains(getId(child));
            if (isExpanded || filter.isPresent()) {
                descendants = flatten(child, expandedFolderIds, filter);
            }

            // Keep folder if it matches itself or has a matching descendant.
            var matchesFilter = matches(child, filter)
                    || !descendants.isEmpty();
            if (matchesFilter) {
                result.add(child);
            }

            // Only include descendants when user actually expanded the folder.
            if (matchesFilter && isExpanded) {
                result.addAll(descendants);
            }
        }

        return result;
    }

    private boolean matches(Folder folder, Optional<String> filter) {
        return filter
                .map(f -> folder.name().toLowerCase().contains(f.toLowerCase()))
                .orElse(true);
    }
}
// end::body[]
