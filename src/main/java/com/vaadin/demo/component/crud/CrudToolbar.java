package com.vaadin.demo.component.crud;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.Html;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.crud.BinderCrudEditor;
import com.vaadin.flow.component.crud.Crud;
import com.vaadin.flow.component.crud.CrudEditor;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.router.Route;

import java.util.Arrays;
import java.util.List;

@Route("crud-toolbar")
public class CrudToolbar extends Div {

  private Crud<Person> crud;
  private PersonDataProvider dataProvider;

  private String FIRST_NAME = "firstName";
  private String LAST_NAME = "lastName";
  private String EDIT_COLUMN = "vaadin-crud-edit-column";

  public CrudToolbar() {
    crud = new Crud<>(
      Person.class,
      createEditor()
    );

    setupGrid();
    setupDataProvider();
    setupToolbar();

    add(crud);
  }

  private CrudEditor<Person> createEditor() {
    TextField firstName = new TextField("First name");
    TextField lastName = new TextField("Last name");
    FormLayout form = new FormLayout(firstName, lastName);

    Binder<Person> binder = new Binder<>(Person.class);
    binder.forField(firstName).asRequired().bind(Person::getFirstName, Person::setFirstName);
    binder.forField(lastName).asRequired().bind(Person::getLastName, Person::setLastName);

    return new BinderCrudEditor<>(binder, form);
  }

  private void setupGrid() {
    Grid<Person> grid = crud.getGrid();

    // Only show these columns (all columns shown by default):
    List<String> visibleColumns = Arrays.asList(
      FIRST_NAME,
      LAST_NAME,
      EDIT_COLUMN
    );
    grid.getColumns().forEach(column -> {
      String key = column.getKey();
      if (!visibleColumns.contains(key)) {
        grid.removeColumn(column);
      }
    });

    // Reorder the columns (alphabetical by default)
    grid.setColumnOrder(
      grid.getColumnByKey(FIRST_NAME),
      grid.getColumnByKey(LAST_NAME),
      grid.getColumnByKey(EDIT_COLUMN)
    );
  }

  private void setupDataProvider() {
    dataProvider = new PersonDataProvider();
    crud.setDataProvider(dataProvider);
    crud.addDeleteListener(deleteEvent ->
      dataProvider.delete(deleteEvent.getItem())
    );
    crud.addSaveListener(saveEvent ->
      dataProvider.persist(saveEvent.getItem())
    );
  }

  private void setupToolbar() {
    // tag::snippet[]
    Html total = new Html("<span>Total: <b>" + dataProvider.DATABASE.size() + "</b> employees</span>");

    Button button = new Button("New employee", VaadinIcon.PLUS.create());
    button.addClickListener(event -> {
      crud.edit(new Person(), Crud.EditMode.NEW_ITEM);
    });
    button.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

    HorizontalLayout toolbar = new HorizontalLayout(total, button);
    toolbar.setAlignItems(FlexComponent.Alignment.CENTER);
    toolbar.setFlexGrow(1, toolbar);
    toolbar.setJustifyContentMode(FlexComponent.JustifyContentMode.BETWEEN);
    toolbar.setSpacing(false);

    crud.setToolbar(toolbar);
    // end::snippet[]
  }
  public static class Exporter extends DemoExporter<CrudToolbar> {} // hidden-source-line
}
