package com.vaadin.demo.component.treegrid.databinding.filter;

import java.util.HashSet;
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
        return flatten(query.getParent(), query.getExpandedItemIds(),
                findIdsMatchingFilter(query.getFilter().orElse("")))
                .skip(query.getOffset()).limit(query.getLimit());
    }

    @Override
    public int getChildCount(HierarchicalQuery<Folder, String> query) {
        return (int) flatten(query.getParent(), query.getExpandedItemIds(),
                findIdsMatchingFilter(query.getFilter().orElse(""))).count();
    }

    private Stream<Folder> flatten(Folder parent, Set<Object> expandedFolderIds,
            Set<Object> idsMatchingFilter) {
        Stream<Folder> children = folderTreeData.getChildren(parent).stream();

        if (idsMatchingFilter != null) {
            children = children.filter(
                    folder -> idsMatchingFilter.contains(getId(folder)));
        }

        return children.flatMap(child -> {
            if (expandedFolderIds.contains(getId(child))) {
                return Stream.concat(Stream.of(child),
                        flatten(child, expandedFolderIds, idsMatchingFilter));
            }

            return Stream.of(child);
        });
    }

    /**
     * Returns the IDs of folders that match the filter, along with the IDs of
     * their ancestors so that deep matches stay reachable when ancestors don't
     * match themselves. Returns null when no filter is active, signaling that
     * every folder should be included.
     */
    private Set<Object> findIdsMatchingFilter(String filter) {
        String term = filter.toLowerCase();
        if (term.isEmpty()) {
            return null;
        }
        Set<Object> idsMatchingFilter = new HashSet<>();
        folderTreeData.getRootItems()
                .forEach(root -> collectIdsMatchingFilter(root, term,
                        idsMatchingFilter));
        return idsMatchingFilter;
    }

    private boolean collectIdsMatchingFilter(Folder folder, String term,
            Set<Object> idsMatchingFilter) {
        boolean folderOrDescendantMatches = folder.name().toLowerCase()
                .contains(term);
        for (Folder child : folderTreeData.getChildren(folder)) {
            folderOrDescendantMatches |= collectIdsMatchingFilter(child, term,
                    idsMatchingFilter);
        }
        if (folderOrDescendantMatches) {
            idsMatchingFilter.add(getId(folder));
        }
        return folderOrDescendantMatches;
    }
}
// end::body[]
