package com.vaadin.demo.component.grid;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Stream;

import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.data.provider.AbstractBackEndDataProvider;
import com.vaadin.flow.data.provider.Query;
import com.vaadin.flow.data.provider.QuerySortOrder;
import com.vaadin.flow.data.provider.SortDirection;

// tag::snippet[]
public class PersonDataProvider
        extends AbstractBackEndDataProvider<Person, String> {
    private static final List<Person> DATABASE = new ArrayList<>(DataService.getPeople());

    @Override
    protected Stream<Person> fetchFromBackEnd(
            Query<Person, String> query) {
        // A real app should use a real database or a service to fetch,
        // filter and sort data.

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
    protected int sizeInBackEnd(Query<Person, String> query) {
        // SQL equivalent: SELECT COUNT(*) FROM ...
        Stream<Person> stream = DATABASE.stream();

        // SQL equivalent: WHERE ...
        stream = stream.filter(createPredicate(query.getFilter()));

        return (int) stream.count();
    }

    private Predicate<Person> createPredicate(Optional<String> filter) {
        return (person) -> filter.map(searchTerm -> {
            if (person.getFullName().toLowerCase().contains(searchTerm.toLowerCase())) {
                return true;
            }
            if (person.getProfession().toLowerCase().contains(searchTerm.toLowerCase())) {
                return true;
            }

            return false;
        }).orElse(true);
    }

    private Comparator<Person> createComparator(List<QuerySortOrder> sortOrders) {
        return sortOrders.stream().map(sortOrder -> {
            Comparator<Person> comparator = switch (sortOrder.getSorted()) {
                case "name" -> Comparator.comparing(Person::getFullName);
                case "profession" -> Comparator.comparing(Person::getProfession);
                default -> (p0, p1) -> 0;
            };

            return sortOrder.getDirection().equals(SortDirection.ASCENDING)
                    ? comparator
                    : comparator.reversed();
        }).reduce((p0, p1) -> 0, Comparator::thenComparing);
    }
}
// end::snippet[]
