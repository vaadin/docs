package com.vaadin.demo.component.treegrid.databinding.filter;

import java.util.Optional;
import java.util.Set;
import java.util.function.Predicate;
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
        return flatten(query.getParent(), query.getExpandedItemIds(), query.getFilter())
                .skip(query.getOffset()).limit(query.getLimit());
    }

    @Override
    public int getChildCount(HierarchicalQuery<Folder, String> query) {
        return (int) flatten(query.getParent(), query.getExpandedItemIds(),
                query.getFilter()).count();
    }

    private Stream<Folder> flatten(Folder parent, Set<Object> expandedFolderIds,
            Optional<String> filter) {
        Stream<Folder> children = folderTreeData.getChildren(parent).stream();

        if (filter.isPresent()) {
            String term = filter.get().toLowerCase();
            children = children.filter(folder -> folder.name().toLowerCase().contains(term));
        }

        return children.flatMap(child -> expandedFolderIds.contains(getId(child))
                ? Stream.concat(Stream.of(child),
                        flatten(child, expandedFolderIds, filter))
                : Stream.of(child));
    }

    // Returns true if the folder or any descendant matches the filter, so that
    // folders containing deep matches stay reachable even when they don't match
    // themselves.
    private boolean matches(Folder folder, Predicate<Folder> filter) {
        return filter.test(folder) || folderTreeData.getChildren(folder).stream()
                .anyMatch(child -> matches(child, filter));
    }

    private static Predicate<Folder> toFilter(String filter) {
        String term = filter.toLowerCase();
        return folder -> term.isEmpty()
                || folder.name().toLowerCase().contains(term);
    }
}
// end::body[]
