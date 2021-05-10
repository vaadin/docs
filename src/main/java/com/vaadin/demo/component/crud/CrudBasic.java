package com.vaadin.demo.component.crud;

import com.vaadin.flow.component.crud.BinderCrudEditor;
import com.vaadin.flow.component.crud.Crud;
import com.vaadin.flow.component.crud.CrudEditor;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.router.Route;

import java.util.Arrays;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Person;

@Route("crud-basic")
public class CrudBasic extends Div {

  public CrudBasic() {
    // tag::snippet[]
    Crud<Person> crud = new Crud<>(Person.class, createPersonEditor());

    PersonDataProvider dataProvider = new PersonDataProvider();

    crud.setDataProvider(dataProvider);
    crud.addSaveListener(e -> dataProvider.persist(e.getItem()));
    crud.addDeleteListener(e -> dataProvider.delete(e.getItem()));

    crud.getGrid().getColumns().forEach(column -> {
      if (!Arrays.asList("firstName", "lastName", "vaadin-crud-edit-column").contains(column.getKey())) {
        crud.getGrid().removeColumn(column);
      }
    });

    add(crud);
    // end::snippet[]
  }

  private CrudEditor<Person> createPersonEditor() {
    TextField firstName = new TextField("First name");
    TextField lastName = new TextField("Last name");
    FormLayout form = new FormLayout(firstName, lastName);

    Binder<Person> binder = new Binder<>(Person.class);
    binder.bind(firstName, Person::getFirstName, Person::setFirstName);
    binder.bind(lastName, Person::getLastName, Person::setLastName);

    return new BinderCrudEditor<>(binder, form);
  }

  public static class Exporter extends DemoExporter<CrudBasic> { // hidden-source-line
  } // hidden-source-line
}
