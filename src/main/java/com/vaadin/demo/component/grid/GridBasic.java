package com.vaadin.demo.component.grid;

import java.util.List;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.demo.domain.DataService;

@Route("grid-basic")
public class GridBasic extends Div {

  public GridBasic() {
    // tag::snippet[]
    Grid<Person> grid = new Grid<>(Person.class);
    List<Person> people = DataService.getPeople();
    grid.setItems(people);
    grid.setColumns("firstName", "lastName", "email");
    add(grid);
    // end::snippet[]
  }

  public static class GridEditorExporter extends DemoExporter<GridBasic> { // hidden-full-source-line
  } // hidden-full-source-line
}
