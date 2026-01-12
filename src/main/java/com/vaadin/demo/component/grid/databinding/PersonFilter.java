package com.vaadin.demo.component.grid.databinding;

// tag::body[]
public record PersonFilter(String nameFilter, String departmentFilter) {
    public boolean test(Person person) {
        boolean matches = true;
        if (nameFilter != null && !nameFilter.isEmpty()) {
            matches &= person.name().toLowerCase().contains(nameFilter.toLowerCase());
        }
        if (departmentFilter != null && !departmentFilter.isEmpty()) {
            matches &= person.department().equals(departmentFilter);
        }
        return matches;
    }
}
// end::body[]
