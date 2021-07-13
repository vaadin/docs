package com.vaadin.demo.component.gridpro;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.gridpro.GridPro;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

import java.util.List;
import java.util.regex.Pattern;

@Route("grid-pro-prevent-save")
public class GridProPreventSave extends Div {

    public GridProPreventSave() {
        // tag::snippet[]
        GridPro<Person> grid = new GridPro<>();

        grid.addEditColumn(Person::getFirstName)
                .text(Person::setFirstName)
                .setHeader("First name");

        grid.addEditColumn(Person::getLastName)
                .text(Person::setLastName)
                .setHeader("Last name");

        grid.addEditColumn(Person::getEmail)
                .text((person, newValue) -> {
                    if (isValidEmail(newValue)) {
                        person.setEmail(newValue);
                    }
                })
                .setHeader("Email");

        grid.addEditColumn(person -> person.getAddress().getPhone())
                .text((person, newValue) -> {
                    if (isValidPhoneNumber(newValue)) {
                        person.getAddress().setPhone(newValue);
                    }
                })
                .setHeader("Phone");
        // end::snippet[]

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        add(grid);
    }

    private boolean isValidPhoneNumber(String phoneNumber) {
        if (phoneNumber == null) return false;

        return Pattern.compile("^[0-9-]+$").matcher(phoneNumber).matches();
    }

    private static boolean isValidEmail(String email) {
        if (email == null) return false;

        String regex = "^" + "([a-zA-Z0-9_.\\-+])+" // local
                + "@" + "[a-zA-Z0-9-.]+" // domain
                + "\\." + "[a-zA-Z0-9-]{2,}" // tld
                + "$";

        return Pattern.compile(regex).matcher(email).matches();
    }

    public static class Exporter extends DemoExporter<GridProPreventSave> { // hidden-source-line
    } // hidden-source-line
}


