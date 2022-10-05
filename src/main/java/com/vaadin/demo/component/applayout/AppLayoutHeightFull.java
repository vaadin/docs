package com.vaadin.demo.component.applayout;

import java.util.List;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.html.H1;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.GridVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("app-layout-height-full")
// tag::snippet[]
public class AppLayoutHeightFull extends AppLayout {

    public AppLayoutHeightFull() {
        H1 title = new H1("MyApp");
        title.getStyle().set("font-size", "var(--lumo-font-size-l)")
                .set("margin", "var(--lumo-space-m)");
        addToNavbar(title);

        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        grid.addColumn(Person::getEmail).setHeader("Email");
        grid.addColumn(Person::getProfession).setHeader("Profession");

        List<Person> people = DataService.getPeople();
        grid.setItems(people);
        setContent(grid);

        getElement().getStyle().set("height", "100%");
        grid.setHeight("100%");
        grid.addThemeVariants(GridVariant.LUMO_NO_BORDER);
        // hidden-source-line - TODO: workaround to get the exported WC
        // hidden-source-line - height to take all the space within DSP
        getElement().executeJs("this.getRootNode().host.style.height='100vh'"); // hidden-source-line
        // hidden-source-line - TODO: workaround to remove the padding from
        // hidden-source-line - parent container (coming from DSP)
        getElement().executeJs( // hidden-source-line
                "this.getRootNode().host.parentElement.style.padding='0'"); // hidden-source-line
    }
    // end::snippet[]

    public static class Exporter extends DemoExporter<AppLayoutHeightFull> { // hidden-source-line
    } // hidden-source-line
      // tag::snippet[]
}
// end::snippet[]
