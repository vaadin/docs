package com.vaadin.demo.component.grid;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Stream;

import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.data.provider.AbstractBackEndDataProvider;
import com.vaadin.flow.data.provider.Query;
import com.vaadin.flow.data.provider.QuerySortOrder;
import com.vaadin.flow.data.provider.SortDirection;

// tag::snippet[]
public class PersonDataProvider extends AbstractBackEndDataProvider<Person, PersonFilter> {
    final List<Person> DATABASE = new ArrayList<>(DataService.getPeople());

    @Override
    protected Stream<Person> fetchFromBackEnd(Query<Person, PersonFilter> query) {
        // A real app should use a real database or a service
        // to fetch, filter and sort data.
        Stream<Person> stream = DATABASE.stream();

        // Filtering
        if (query.getFilter().isPresent()) {
            stream = stream.filter(person -> query.getFilter().get().test(person));
        }

        // Sorting
        if (query.getSortOrders().size() > 0) {
            stream = stream.sorted(sortComparator(query.getSortOrders()));
        }

        // Pagination
        return stream.skip(query.getOffset()).limit(query.getLimit());
    }

    @Override
    protected int sizeInBackEnd(Query<Person, PersonFilter> query) {
        return (int) fetchFromBackEnd(query).count();
    }

    private static Comparator<Person> sortComparator(List<QuerySortOrder> sortOrders) {
        return sortOrders.stream().map(sortOrder -> {
            Comparator<Person> comparator = personFieldComparator(sortOrder.getSorted());

            if (sortOrder.getDirection() == SortDirection.DESCENDING) {
                comparator = comparator.reversed();
            }

            return comparator;
        }).reduce(Comparator::thenComparing).orElse((p1, p2) -> 0);
    }

    private static Comparator<Person> personFieldComparator(String sorted) {
        if (sorted.equals("name")) {
            return Comparator.comparing(person -> person.getFullName());
        } else if (sorted.equals("profession")) {
            return Comparator.comparing(person -> person.getProfession());
        }
        return (p1, p2) -> 0;
    }
}
// end::snippet[]
