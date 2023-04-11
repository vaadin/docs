package com.vaadin.demo.component.grid;

import com.vaadin.demo.domain.Person;

// tag::snippet[]
public class PersonFilter {
    private String searchTerm;

    public void setSearchTerm(String searchTerm) {
        this.searchTerm = searchTerm;
    }

    public boolean test(Person person) {
        boolean matchesFullName = matches(person.getFullName(), searchTerm);
        boolean matchesProfession = matches(person.getProfession(), searchTerm);
        return matchesFullName || matchesProfession;
    }

    private boolean matches(String value, String searchTerm) {
        return searchTerm == null || searchTerm.isEmpty()
                || value.toLowerCase().contains(searchTerm.toLowerCase());
    }
}
// end::snippet[]
