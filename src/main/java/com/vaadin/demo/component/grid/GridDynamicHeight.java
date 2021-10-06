package com.vaadin.demo.component.grid;

import java.util.ArrayList;
import java.util.List;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("grid-dynamic-height")
public class GridDynamicHeight extends Div {

    private static final List<Person> invitedPeople = new ArrayList<>();

    private static Grid<Person> grid;
    private static Div hint;

    public GridDynamicHeight() {
        this.setupInvitationForm();
        this.setupGrid();
        this.refreshGrid();
    }

    private void setupInvitationForm() {
        List<Person> people = DataService.getPeople();
        ComboBox<Person> comboBox = new ComboBox<>();
        comboBox.setItems(people);
        comboBox.setItemLabelGenerator(Person::getFullName);

        Button button = new Button("Send invite");
        button.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        button.addClickListener(e -> {
            sendInvitation(comboBox.getValue());
            comboBox.setValue(null);
        });

        HorizontalLayout layout = new HorizontalLayout(comboBox, button);
        layout.setFlexGrow(1, comboBox);

        add(layout);
    }

    private void setupGrid() {
        // tag::snippet[]
        grid = new Grid<>(Person.class, false);
        grid.setAllRowsVisible(true);
        // end::snippet[]
        grid.addColumn(Person::getFullName).setHeader("Name");
        grid.addColumn(Person::getEmail).setHeader("Email");
        grid.addColumn(person -> person.getAddress().getPhone())
                .setHeader("Phone");
        grid.addColumn(
                new ComponentRenderer<>(Button::new, (button, person) -> {
                    button.addThemeVariants(ButtonVariant.LUMO_ICON,
                            ButtonVariant.LUMO_ERROR,
                            ButtonVariant.LUMO_TERTIARY);
                    button.addClickListener(e -> this.removeInvitation(person));
                    button.setIcon(new Icon(VaadinIcon.TRASH));
                })).setHeader("Manage");

        grid.setItems(invitedPeople);

        hint = new Div();
        hint.setText("No invitation has been sent");
        hint.getStyle().set("padding", "var(--lumo-size-l)")
                .set("text-align", "center").set("font-style", "italic")
                .set("color", "var(--lumo-contrast-70pct)");

        add(hint, grid);
    }

    private void refreshGrid() {
        if (invitedPeople.size() > 0) {
            grid.setVisible(true);
            hint.setVisible(false);
            grid.getDataProvider().refreshAll();
        } else {
            grid.setVisible(false);
            hint.setVisible(true);
        }
    }

    private void sendInvitation(Person person) {
        if (person == null || invitedPeople.contains(person))
            return;
        invitedPeople.add(person);
        this.refreshGrid();
    }

    private void removeInvitation(Person person) {
        if (person == null)
            return;
        invitedPeople.remove(person);
        this.refreshGrid();
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridDynamicHeight> { // hidden-source-line
    } // hidden-source-line
}
