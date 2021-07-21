package com.vaadin.demo.component.button;

import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

import java.util.List;

@Route("button-grid")
public class ButtonGrid extends VerticalLayout {
    public ButtonGrid() {
        // tag::snippet[]
        H2 users = new H2("Users");
        users.getStyle().set("margin", "0 auto 0 0");
        Button addUser = new Button("Add user");
        HorizontalLayout header = new HorizontalLayout(users, addUser);
        header.setAlignItems(Alignment.CENTER);
        header.getThemeList().clear();

        Button editProfile = new Button("Edit profile");
        editProfile.setEnabled(false);

        Button managePermissions = new Button("Manage permissions");
        managePermissions.setEnabled(false);

        Button resetPassword = new Button("Reset password");
        resetPassword.setEnabled(false);

        Button delete = new Button("Delete");
        delete.setEnabled(false);
        delete.addThemeVariants(ButtonVariant.LUMO_ERROR);
        delete.getStyle().set("margin-inline-start", "auto");

        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.setSelectionMode(Grid.SelectionMode.MULTI);
        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        grid.addColumn(Person::getEmail).setHeader("Email");
        grid.addSelectionListener(selection -> {
            int size = selection.getAllSelectedItems().size();
            boolean isSingleSelection = size == 1;
            editProfile.setEnabled(isSingleSelection);
            managePermissions.setEnabled(isSingleSelection);
            resetPassword.setEnabled(isSingleSelection);

            delete.setEnabled(size != 0);
        });

        HorizontalLayout footer = new HorizontalLayout(editProfile, managePermissions, resetPassword, delete);
        footer.getStyle().set("flex-wrap", "wrap");
        // end::snippet[]

        List<Person> people = DataService.getPeople();
        grid.setItems(people);
        setPadding(false);
        setAlignItems(Alignment.STRETCH);
        add(header, grid, footer);
    }

    public static class Exporter extends DemoExporter<ButtonGrid> { // hidden-source-line
    } // hidden-source-line
}
