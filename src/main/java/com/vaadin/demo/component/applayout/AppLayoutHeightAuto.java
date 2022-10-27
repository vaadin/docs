package com.vaadin.demo.component.applayout;

import java.util.List;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.html.H1;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("app-layout-height-auto")
// tag::snippet[]
public class AppLayoutHeightAuto extends AppLayout {

    public AppLayoutHeightAuto() {
        H1 title = new H1("MyApp");
        title.getStyle().set("font-size", "var(--lumo-font-size-l)")
                .set("margin", "var(--lumo-space-m)");
        addToNavbar(title);

        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        grid.addColumn(Person::getEmail).setHeader("Email");
        grid.addColumn(Person::getProfession).setHeader("Profession");

        List<Person> people = DataService.getPeople(20);
        grid.setItems(people);
        grid.setAllRowsVisible(true);
        setContent(grid);
    }
    // end::snippet[]

    public static class Exporter extends DemoExporter<AppLayoutHeightAuto> { // hidden-source-line
    } // hidden-source-line
      // tag::snippet[]
}
// end::snippet[]
