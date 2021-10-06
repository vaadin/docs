package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Address;
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.GridVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.data.renderer.LitRenderer;
import com.vaadin.flow.data.renderer.Renderer;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("grid-wrap-cell-content")
public class GridWrapCellContent extends Div {

    public GridWrapCellContent() {
        // tag::snippet[]
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(createAvatarRenderer()).setHeader("Image")
                .setAutoWidth(true).setFlexGrow(0);
        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        grid.addColumn(GridWrapCellContent::formatAddress).setHeader("Address");

        grid.addThemeVariants(GridVariant.LUMO_WRAP_CELL_CONTENT);
        // end::snippet[]

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        add(grid);
    }

    private static String formatAddress(Person person) {
        Address address = person.getAddress();

        return String
                .format("%s %s %s %s", address.getStreet(), address.getCity(),
                        address.getZip(), address.getState());
    }

    private static Renderer<Person> createAvatarRenderer() {
        return LitRenderer.<Person>of(
                "<vaadin-avatar img=\"${item.pictureUrl}\" name=\"${item.fullName}\" alt=\"User avatar\"></vaadin-avatar>")
                .withProperty("pictureUrl", Person::getPictureUrl);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridWrapCellContent> { // hidden-source-line
    } // hidden-source-line
}
