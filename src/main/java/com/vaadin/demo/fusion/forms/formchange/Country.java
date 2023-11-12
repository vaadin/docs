package com.vaadin.demo.fusion.forms.formchange;

import java.util.List;

public class Country {
    private String name;

    List<City> cities;

    public Country() {
    }

    public Country(String name, List<City> countries) {
        this.name = name;
        this.cities = countries;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<City> getCities() {
        return cities;
    }

    public void setCities(List<City> cities) {
        this.cities = cities;
    }
}
