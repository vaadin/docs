package com.vaadin.demo.component.grid;

import java.util.List;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.contextmenu.ContextMenu;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("grid-column-visibility")
public class GridColumnVisibility extends Div {

    public GridColumnVisibility() {
        // tag::snippet1[]
        Grid<Person> grid = new Grid<>(Person.class, false);
        Grid.Column<Person> firstNameColumn = grid.addColumn(Person::getFirstName)
                .setHeader("First name");
        Grid.Column<Person> lastNameColumn = grid.addColumn(Person::getLastName)
                .setHeader("Last name");
        Grid.Column<Person> emailColumn = grid.addColumn(Person::getEmail)
                .setHeader("Email");
        Grid.Column<Person> phoneColumn = grid
                .addColumn(person -> person.getAddress().getPhone())
                .setHeader("Phone");
        Grid.Column<Person> professionColumn = grid.addColumn(Person::getProfession)
                .setHeader("Profession");

        Button menuButton = new Button("Show/Hide Columns");
        menuButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        ColumnToggleContextMenu columnToggleContextMenu = new ColumnToggleContextMenu(
                menuButton);
        columnToggleContextMenu.addColumnToggleItem("First name", firstNameColumn);
        columnToggleContextMenu.addColumnToggleItem("Last name", lastNameColumn);
        columnToggleContextMenu.addColumnToggleItem("Email", emailColumn);
        columnToggleContextMenu.addColumnToggleItem("Phone", phoneColumn);
        columnToggleContextMenu.addColumnToggleItem("Profession", professionColumn);
        // end::snippet1[]

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        Span title = new Span("Employees");
        title.getStyle().set("font-weight", "bold");
        HorizontalLayout headerLayout = new HorizontalLayout(title, menuButton);
        headerLayout.setAlignItems(FlexComponent.Alignment.BASELINE);
        headerLayout.setFlexGrow(1, title);

        add(headerLayout, grid);
    }

    private static class ColumnToggleContextMenu extends ContextMenu {
        public ColumnToggleContextMenu(Component target) {
            super(target);
            setOpenOnClick(true);
        }

        // tag::snippet2[]
        void addColumnToggleItem(String label, Grid.Column<Person> column) {
            MenuItem menuItem = this.addItem(label, e -> {
                column.setVisible(e.getSource().isChecked());
            });
            menuItem.setCheckable(true);
            menuItem.setChecked(column.isVisible());
        }
        // end::snippet2[]
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridColumnVisibility> { // hidden-source-line
    } // hidden-source-line
}
