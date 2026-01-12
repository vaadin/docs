package com.vaadin.demo.component.grid.databinding;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Stream;

// tag::body[]
public class PersonService {
    private static final List<Person> PEOPLE = Arrays.asList(
            new Person("Michael Chen", "Engineering"),
            new Person("Sarah Johnson", "Engineering"),
            new Person("David Rodriguez", "Marketing"),
            new Person("Emma Wilson", "HR"));

    public static Stream<Person> fetch(
            String searchTerm, String sortOrder, int offset, int limit) {
        return PEOPLE.stream()
                .filter(createPredicate(searchTerm))
                .sorted(createComparator(sortOrder))
                .skip(offset)
                .limit(limit);
    }

    public static int count(String searchTerm) {
        return (int) PEOPLE.stream()
                .filter(createPredicate(searchTerm))
                .count();
    }

    private static Predicate<Person> createPredicate(String searchTerm) {
        return person -> person.name().toLowerCase()
                .contains(searchTerm != null ? searchTerm.toLowerCase() : "");
    }

    private static Comparator<Person> createComparator(String sortOrder) {
        return switch (sortOrder) {
            case "Name (A-Z)" -> Comparator.comparing(Person::name);
            case "Name (Z-A)" -> Comparator.comparing(Person::name).reversed();
            default -> (p1, p2) -> 0;
        };
    }
}
// end::body[]
