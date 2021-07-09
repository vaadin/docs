package com.vaadin.demo.component.dialog;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("dialog-resizable")
public class DialogResizable extends Div {

    public DialogResizable() {
        Dialog dialog = new Dialog();
        dialog.getElement().setAttribute("aria-label", "Employee list");

        VerticalLayout dialogLayout = createDialogLayout();
        dialog.add(dialogLayout);
        // tag::snippet[]
        dialog.setDraggable(true);
        dialog.setResizable(true);
        // end::snippet[]

        Button button = new Button("Show dialog", e -> dialog.open());
        add(dialog, button);
    }

    private static VerticalLayout createDialogLayout() {
        H2 headline = new H2("Employee list");
        headline.getStyle().set("margin", "var(--lumo-space-m) 0 0 0")
                .set("font-size", "1.5em").set("font-weight", "bold");

        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        grid.addColumn(Person::getEmail).setHeader("Email");
        grid.addColumn(Person::getProfession).setHeader("Profession");
        grid.addColumn(Person::getMembership).setHeader("Membership");

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        VerticalLayout dialogLayout = new VerticalLayout(headline, grid);
        dialogLayout.setPadding(false);
        dialogLayout.setAlignItems(FlexComponent.Alignment.STRETCH);
        dialogLayout.getStyle().set("min-width", "300px")
                .set("max-width", "100%").set("height", "100%");

        return dialogLayout;
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<DialogResizable> { // hidden-source-line
    } // hidden-source-line
}
