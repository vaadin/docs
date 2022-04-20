package com.vaadin.demo.component.dialog;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.dialog.DialogVariant;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("dialog-no-padding")
public class DialogNoPadding extends Div {

    public DialogNoPadding() {
        Dialog dialog = new Dialog();
        dialog.setHeaderTitle("Filter reports by users:");

        dialog.add(createDialogContent(dialog));
        dialog.getFooter().add(createFilterButton(dialog));

        // tag::snippet[]
        dialog.addThemeVariants(DialogVariant.LUMO_NO_PADDING);
        // end::snippet[]

        Button button = new Button("Show dialog", e -> dialog.open());

        add(dialog, button);
    }

    private static Grid<Person> createDialogContent(Dialog dialog) {
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.setItems(DataService.getPeople(50));
        grid.setSelectionMode(Grid.SelectionMode.MULTI);
        grid.addColumn(Person::getFullName).setHeader("Name");

        grid.getStyle().set("width", "500px").set("max-width", "100%");

        return grid;
    }

    private static Button createFilterButton(Dialog dialog) {
        Button filterButton = new Button("Filter", e -> dialog.close());
        filterButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        return filterButton;
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<DialogNoPadding> { // hidden-source-line
    } // hidden-source-line
}
