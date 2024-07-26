package com.vaadin.demo.fusion.forms.formchange;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import java.util.List;

@BrowserCallable
@AnonymousAllowed
public class OfficeService {

    private final List<Country> countries = List.of(
            new Country("Germany",
                    List.of(new City("Berlin"), new City("Hamburg"),
                            new City("Munich"))),
            new Country("France",
                    List.of(new City("Paris"), new City("Marseille"),
                            new City("Lyon"))),
            new Country("Spain",
                    List.of(new City("Madrid"), new City("Barcelona"),
                            new City("Valencia"))),
            new Country("Italy",
                    List.of(new City("Rome"), new City("Milan"),
                            new City("Naples"))),
            new Country("United Kingdom", List.of(new City("London"),
                    new City("Birmingham"), new City("Glasgow"))));

    private CompanyOffice companyOffice = new CompanyOffice(countries.get(0),
            countries.get(0).getCities().get(0));

    public CompanyOffice loadCompanyOffice() {
        return companyOffice;
    }

    public void saveCompanyOffice(CompanyOffice companyOffice) {
        this.companyOffice = companyOffice;
    }

    public List<Country> loadCountries() {
        return countries;
    }

    public List<City> loadCities(String countryName) {
        // Find the cities by country
        return countries.stream()
                .filter(country -> country.getName().equals(countryName))
                .findFirst().map(Country::getCities).orElseThrow(
                        () -> new IllegalArgumentException("No such country"));
    }

}
