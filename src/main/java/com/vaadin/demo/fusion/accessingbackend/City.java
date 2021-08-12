package com.vaadin.demo.fusion.accessingbackend;

// tag::snippet[]
/**
 * An entity that contains an information about a city.
 */
public class City {
    private final String country;
    private final String name;

    public City(String name, String country) {
        this.country = country;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String getCountry() {
        return country;
    }
}
// end::snippet[]
