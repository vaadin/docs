package com.vaadin.demo.component.grid.databinding;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Stream;

import com.vaadin.flow.data.provider.AbstractBackEndDataProvider;
import com.vaadin.flow.data.provider.Query;
import com.vaadin.flow.data.provider.QuerySortOrder;
import com.vaadin.flow.data.provider.SortDirection;

// tag::body[]
public class PersonDataProvider extends AbstractBackEndDataProvider<Person, PersonFilter> {
    // In a real application, data would come from a real database or backend
    // service. This example uses a static list for demonstration purposes only.
    private static final List<Person> DATABASE = Arrays.asList(
            new Person("Michael Chen", "Engineering"),
            new Person("Sarah Johnson", "Engineering"),
            new Person("David Rodriguez", "Marketing"),
            new Person("Emma Wilson", "HR"));

    @Override
    protected Stream<Person> fetchFromBackEnd(Query<Person, PersonFilter> query) {
        // SQL equivalent: SELECT ... FROM ...
        Stream<Person> stream = DATABASE.stream();

        // SQL equivalent: WHERE ...
        stream = stream.filter(createPredicate(query.getFilter()));

        // SQL equivalent: ORDER BY ...
        stream = stream.sorted(createComparator(query.getSortOrders()));

        // SQL equivalent: OFFSET ... LIMIT ...
        stream = stream.skip(query.getOffset()).limit(query.getLimit());

        return stream;
    }

    @Override
    protected int sizeInBackEnd(Query<Person, PersonFilter> query) {
        // SQL equivalent: SELECT COUNT(*) FROM ...
        Stream<Person> stream = DATABASE.stream();

        // SQL equivalent: WHERE ...
        stream = stream.filter(createPredicate(query.getFilter()));

        return (int) stream.count();
    }

    /**
     * Creates a filter function (predicate) based on the filter object from the
     * Grid.
     *
     * This is for demonstration purposes only. In a real application, you should do
     * filtering in the database query e.g. by using SQL WHERE if you are using a
     * relational database.
     */
    private Predicate<Person> createPredicate(Optional<PersonFilter> filter) {
        return filter.map(f -> (Predicate<Person>) f::test).orElse(p -> true);
    }

    /**
     * Creates a sorting function (comparator) based on the sort orders from the
     * Grid.
     *
     * This is for demonstration purposes only. In a real application, you should do
     * sorting in the database query e.g. by using SQL ORDER BY if you are using a
     * relational database.
     */
    private Comparator<Person> createComparator(List<QuerySortOrder> sortOrders) {
        return sortOrders.stream().map(sortOrder -> {
            Comparator<Person> comparator = switch (sortOrder.getSorted()) {
                case "name" -> Comparator.comparing(Person::name);
                case "department" -> Comparator.comparing(Person::department);
                default -> (p0, p1) -> 0;
            };

            return sortOrder.getDirection().equals(SortDirection.ASCENDING)
                    ? comparator
                    : comparator.reversed();
        }).reduce((p0, p1) -> 0, Comparator::thenComparing);
    }
}
// end::body[]
