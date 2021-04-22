package com.vaadin.demo.component.crud;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.demo.domain.Person;
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

@Route("crud-grid-replacement")
public class CrudGridReplacement extends Div {

  private Crud<Person> crud;

  public CrudGridReplacement() {
    // tag::snippet1[]
    crud = new Crud<>(
      Person.class,
      createGrid(),
      createEditor()
    );
    // end::snippet1[]

    setupDataProvider();

    add(crud);
  }

  private CrudEditor<Person> createEditor() {
    TextField firstName = new TextField("First name");
    firstName.setRequiredIndicatorVisible(true);

    TextField lastName = new TextField("Last name");
    lastName.setRequiredIndicatorVisible(true);

    EmailField email = new EmailField("Email");
    email.setRequiredIndicatorVisible(true);

    TextField profession = new TextField("Profession");
    profession.setRequiredIndicatorVisible(true);

    FormLayout form = new FormLayout(firstName, lastName, email, profession);

    Binder<Person> binder = new Binder<>(Person.class);
    binder.bind(firstName, Person::getFirstName, Person::setFirstName);
    binder.bind(lastName, Person::getLastName, Person::setLastName);
    binder.bind(email, Person::getEmail, Person::setEmail);
    binder.bind(profession, Person::getProfession, Person::setProfession);

    return new BinderCrudEditor<>(binder, form);
  }

  // tag::snippet2[]
  private Grid<Person> createGrid() {
    Grid<Person> grid = new Grid<>();
    Crud.addEditColumn(grid);
    grid.addColumn(Person::getFirstName).setHeader("First name");
    grid.addColumn(Person::getLastName).setHeader("Last name");
    grid.addColumn(Person::getEmail).setHeader("Email");
    grid.addColumn(Person::getProfession).setHeader("Profession");
    return grid;
  }
  // end::snippet2[]

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
  public static class Exporter extends DemoExporter<CrudGridReplacement> {} // hidden-full-source-line
}
