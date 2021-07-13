package com.vaadin.demo.component.gridpro;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.gridpro.GridPro;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.data.renderer.TextRenderer;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Route("grid-pro-editors")
public class GridProEditor extends Div {

    public GridProEditor() {
        // tag::snippet[]
        GridPro<Person> grid = new GridPro<>();

        grid.addEditColumn(Person::getFirstName)
                .text(Person::setFirstName)
                .setHeader("First name");

        List<String> membershipOptions = Arrays.asList("Regular", "Premium", "VIP");
        grid.addEditColumn(Person::getMembership)
                .select(Person::setMembership, membershipOptions)
                .setHeader("Membership");

        grid.addEditColumn(Person::isSubscriber)
                .checkbox(Person::setSubscriber)
                .setHeader("Subscriber");

        DatePicker datePicker = new DatePicker();
        datePicker.setWidthFull();

        grid.addEditColumn(GridProEditor::getBirthdayAsLocalDate, new TextRenderer<>(
                person -> getBirthdayAsLocalDate(person).format(birthdayFormatter)
        )).custom(datePicker, (person, newValue) -> {
            Date date = Date.from(
                    newValue.atStartOfDay(ZoneId.systemDefault()).toInstant()
            );
            person.setBirthday(date);
        }).setHeader("Birthday");
        // end::snippet[]

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        add(grid);
    }

    private static final DateTimeFormatter birthdayFormatter = DateTimeFormatter
            .ofPattern("MM/dd/yyyy");

    private static LocalDate getBirthdayAsLocalDate(Person person) {
        return person.getBirthday()
                .toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }

    public static class Exporter extends DemoExporter<GridProEditor> { // hidden-source-line
    } // hidden-source-line
}