package com.vaadin.demo.component.treegrid.databinding.sort;

import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Stream;

import com.vaadin.demo.component.treegrid.databinding.Folder;
import com.vaadin.demo.component.treegrid.databinding.FolderTreeData;
import com.vaadin.flow.data.provider.QuerySortOrder;
import com.vaadin.flow.data.provider.SortDirection;
import com.vaadin.flow.data.provider.hierarchy.AbstractHierarchicalDataProvider;
import com.vaadin.flow.data.provider.hierarchy.HierarchicalQuery;

// tag::body[]
public class FolderDataProvider
        extends AbstractHierarchicalDataProvider<Folder, Void> {
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
    public Stream<Folder> fetchChildren(HierarchicalQuery<Folder, Void> query) {
        // @formatter:off hidden-source-line
        return flatten(
                query.getParent(),
                query.getExpandedItemIds(),
                query.getSortOrders())
                .skip(query.getOffset()).limit(query.getLimit());
        // @formatter:on hidden-source-line
    }

    @Override
    public int getChildCount(HierarchicalQuery<Folder, Void> query) {
        // @formatter:off hidden-source-line
        return (int) flatten(
                query.getParent(),
                query.getExpandedItemIds(),
                // Sorting doesn't affect the count, so it can be omitted
                // here to improve performance.
                null)
                .count();
        // @formatter:end hidden-source-line
    }

    private Stream<Folder> flatten(Folder parent, Set<Object> expandedFolderIds,
            List<QuerySortOrder> sortOrders) {
        Stream<Folder> children = folderTreeData.getChildren(parent).stream();

        // Apply the comparator separately at each hierarchy level so that
        // parents continue to precede their children in the resulting flat
        // list. With nested data providers this is implicit, because each
        // fetchChildren call returns the children of a single parent. With
        // flattened data providers, sorting must be applied independently to
        // each level when constructing the flat list.
        if (sortOrders != null) {
            Comparator<Folder> comparator = sortOrders.stream()
                    .map(FolderDataProvider::toComparator)
                    .reduce(Comparator::thenComparing).orElse(null);

            children = children.sorted(comparator);
        }

        return children.flatMap(child -> {
            if (expandedFolderIds.contains(getId(child))) {
                return Stream.concat(Stream.of(child),
                        flatten(child, expandedFolderIds, sortOrders));
            }

            return Stream.of(child);
        });
    }

    private static Comparator<Folder> toComparator(QuerySortOrder sortOrder) {
        Comparator<Folder> comparator = switch (sortOrder.getSorted()) {
        case "name" -> Comparator.comparing(Folder::name);
        default -> (a, b) -> 0;
        };
        return sortOrder.getDirection() == SortDirection.DESCENDING
                ? comparator.reversed()
                : comparator;
    }
}
// end::body[]
