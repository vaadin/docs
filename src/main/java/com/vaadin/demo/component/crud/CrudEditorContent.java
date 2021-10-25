package com.vaadin.demo.component.crud;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.crud.BinderCrudEditor;
import com.vaadin.flow.component.crud.Crud;
import com.vaadin.flow.component.crud.CrudEditor;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.router.Route;

import java.util.Arrays;
import java.util.List;

@Route("crud-editor-content")
public class CrudEditorContent extends Div {

  private Crud<Person> crud;

  private String FIRST_NAME = "firstName";
  private String LAST_NAME = "lastName";
  private String EMAIL = "email";
  private String PROFESSION = "profession";
  private String EDIT_COLUMN = "vaadin-crud-edit-column";

  private List<String> professions = DataService.getProfessions();

  public CrudEditorContent() {
    // tag::snippet1[]
    crud = new Crud<>(
      Person.class,
      createEditor()
    );
    // end::snippet1[]

    setupGrid();
    setupDataProvider();

    add(crud);
  }

  // tag::snippet2[]
  private CrudEditor<Person> createEditor() {
    TextField firstName = new TextField("First name");
    TextField lastName = new TextField("Last name");
    EmailField email = new EmailField("Email");
    ComboBox<String> profession = new ComboBox<>("Profession");
    profession.setItems(professions);

    FormLayout form = new FormLayout(firstName, lastName, email, profession);
    form.setColspan(email, 2);
    form.setColspan(profession, 2);
    form.setMaxWidth("480px");
    form.setResponsiveSteps(
      new FormLayout.ResponsiveStep("0", 1),
      new FormLayout.ResponsiveStep("30em", 2)
    );

    Binder<Person> binder = new Binder<>(Person.class);
    binder.forField(firstName).asRequired().bind(Person::getFirstName, Person::setFirstName);
    binder.forField(lastName).asRequired().bind(Person::getLastName, Person::setLastName);
    binder.forField(email).asRequired().bind(Person::getEmail, Person::setEmail);
    binder.forField(profession).asRequired().bind(Person::getProfession, Person::setProfession);

    return new BinderCrudEditor<>(binder, form);
  }
  // end::snippet2[]

  private void setupGrid() {
    Grid<Person> grid = crud.getGrid();

    // Only show these columns (all columns shown by default):
    List<String> visibleColumns = Arrays.asList(
      FIRST_NAME,
      LAST_NAME,
      EMAIL,
      PROFESSION,
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
      grid.getColumnByKey(EMAIL),
      grid.getColumnByKey(PROFESSION),
      grid.getColumnByKey(EDIT_COLUMN)
    );
  }

  private void setupDataProvider() {
    PersonDataProvider dataProvider = new PersonDataProvider();
    crud.setDataProvider(dataProvider);
    crud.addDeleteListener(deleteEvent ->
      dataProvider.delete(deleteEvent.getItem())
    );
    crud.addSaveListener(saveEvent ->
      dataProvider.persist(saveEvent.getItem())
    );
  }
  public static class Exporter extends DemoExporter<CrudEditorContent> {} // hidden-source-line
}
