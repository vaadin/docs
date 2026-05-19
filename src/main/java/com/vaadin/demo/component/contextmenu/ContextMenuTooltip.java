package com.vaadin.demo.component.contextmenu;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.contextmenu.GridContextMenu;
import com.vaadin.flow.component.grid.contextmenu.GridMenuItem;
import com.vaadin.flow.component.grid.contextmenu.GridSubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.shared.Tooltip.TooltipPosition;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("context-menu-tooltip")
public class ContextMenuTooltip extends Div {

    private List<Person> people = DataService.getPeople(5);

    public ContextMenuTooltip() {
        Grid<Person> grid = new Grid();
        grid.setAllRowsVisible(true);
        grid.setItems(people);

        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        grid.addColumn(Person::getEmail).setHeader("Email");

        // tag::snippet[]
        GridContextMenu<Person> menu = grid.addContextMenu();
        GridMenuItem<Person> edit = menu.addItem("Edit");
        edit.setTooltipText("Edit selected person");

        GridMenuItem<Person> share = menu.addItem("Share");
        GridSubMenu<Person> shareSubMenu = share.getSubMenu();
        shareSubMenu.addItem("Copy link")
                .setTooltipText("Copy a shareable link to the clipboard");
        GridMenuItem<Person> email = shareSubMenu.addItem("Email");
        email.setTooltipText("Send the contact details by email");
        email.setTooltipPosition(TooltipPosition.END);
        // end::snippet[]

        add(grid);
    }

    public static class Exporter extends DemoExporter<ContextMenuTooltip> { // hidden-source-line
    } // hidden-source-line
}
