package com.vaadin.demo.fusion.forms.formchange;

public class CompanyOffice {

    private Country country;
    private City city;

    public CompanyOffice() {
    }

    public CompanyOffice(Country country, City city) {
        this.country = country;
        this.city = city;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }
}
