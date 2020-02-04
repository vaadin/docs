package com.vaadin.demo.component.grid;

import java.util.List;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.editor.Editor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter;
import com.vaadin.demo.domain.DataService;

@Route("grid-editor")
public class GridEditor extends Div {

  public GridEditor() {
    // tag::snippet[]
    Grid<Person> grid = new Grid<>(Person.class);
    List<Person> persons = DataService.getPeople();
    grid.setItems(persons);
    add(grid);

    Editor<Person> editor = grid.getEditor();
    grid.getColumns().forEach(column -> {
      column.setEditorComponent(new TextField());
    });

    grid.addItemDoubleClickListener(e -> {
      editor.editItem(e.getItem());
    });
    // end::snippet[]
  }

  public static class GridEditorExporter extends DemoExporter<GridEditor> {
  }
}
