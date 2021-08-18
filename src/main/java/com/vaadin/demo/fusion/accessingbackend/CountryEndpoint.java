package com.vaadin.demo.fusion.accessingbackend;

import java.util.Arrays;
import java.util.List;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.fusion.Endpoint;

/**
 * A Vaadin endpoint that shows principles of work with entities.
 */
@Endpoint
@AnonymousAllowed
public class CountryEndpoint {
    private final List<City> cities = Arrays.asList(
            new City("Turku", "Finland"), new City("Berlin", "Germany"),
            new City("London", "UK"), new City("New York", "USA"));

    /**
     * A method that returns a collection of entities.
     */
    public List<City> getCities(Query query) {
        return query.getNumberOfCities() <= cities.size() ?
                cities.subList(0, query.getNumberOfCities() - 1) : cities;
    }

    /**
     * An entity specified as an inner class.
     */
    public static class Query {
        private final int numberOfCities;

        public Query(final int numberOfCities) {
            this.numberOfCities = numberOfCities;
        }

        public int getNumberOfCities() {
            return numberOfCities;
        }
    }
}
