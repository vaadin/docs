package com.vaadin.demo.component.crud;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.crud.BinderCrudEditor;
import com.vaadin.flow.component.crud.Crud;
import com.vaadin.flow.component.crud.CrudEditor;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.router.Route;

import java.util.Arrays;
import java.util.List;

@Route("crud-columns")
public class CrudColumns extends Div {

  private Crud<Person> crud;

  private String FIRST_NAME = "firstName";
  private String EMAIL = "email";
  private String PROFESSION = "profession";
  private String BIRTHDAY = "birthday";
  private String EDIT_COLUMN = "vaadin-crud-edit-column";

  public CrudColumns() {
    // tag::snippet[]
    crud = new Crud<>(
      Person.class,
      createEditor()
    );

    setupGrid();
    setupDataProvider();

    add(crud);
    // end::snippet[]
  }

  private CrudEditor<Person> createEditor() {
    TextField firstName = new TextField("First name");
    firstName.setRequiredIndicatorVisible(true);

    EmailField email = new EmailField("Email");
    email.setRequiredIndicatorVisible(true);

    TextField profession = new TextField("Profession");
    profession.setRequiredIndicatorVisible(true);

    DatePicker birthday = new DatePicker("Birthday");
    birthday.setRequiredIndicatorVisible(true);

    FormLayout form = new FormLayout(firstName, email, profession, birthday);

    Binder<Person> binder = new Binder<>(Person.class);
    binder.bind(firstName, Person::getFirstName, Person::setFirstName);
    binder.bind(email, Person::getEmail, Person::setEmail);
    binder.bind(profession, Person::getProfession, Person::setProfession);
    // binder.bind(birthday, Person::getBirthday, Person::setBirthday);

    return new BinderCrudEditor<>(binder, form);
  }

  private void setupGrid() {
    Grid<Person> grid = crud.getGrid();

    // tag::snippet[]
    // Only show these columns (all columns shown by default):
    List<String> visibleColumns = Arrays.asList(
      FIRST_NAME,
      EMAIL,
      PROFESSION,
      BIRTHDAY,
      EDIT_COLUMN
    );
    grid.getColumns().forEach(column -> {
      String key = column.getKey();
      if (!visibleColumns.contains(key)) {
        grid.removeColumn(column);
      }
    });
    // end::snippet[]

    // Reorder the columns (alphabetical by default)
    grid.setColumnOrder(
      grid.getColumnByKey(FIRST_NAME),
      grid.getColumnByKey(EMAIL),
      grid.getColumnByKey(PROFESSION),
      grid.getColumnByKey(BIRTHDAY),
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
  public static class Exporter extends DemoExporter<CrudColumns> {} // hidden-full-source-line
}
