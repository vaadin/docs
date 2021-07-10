package com.vaadin.demo.component.crud;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.crud.BinderCrudEditor;
import com.vaadin.flow.component.crud.Crud;
import com.vaadin.flow.component.crud.CrudEditor;
import com.vaadin.flow.component.crud.CrudI18n;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.router.Route;

import java.util.Arrays;
import java.util.List;

@Route("crud-localization")
public class CrudLocalization extends Div {

  private Crud<Person> crud;

  private String FIRST_NAME = "firstName";
  private String LAST_NAME = "lastName";
  private String EMAIL = "email";
  private String PROFESSION = "profession";
  private String EDIT_COLUMN = "vaadin-crud-edit-column";

  public CrudLocalization() {
    crud = new Crud<>(
      Person.class,
      createEditor()
    );

    setupGrid();
    setupDataProvider();
    setupI18n();

    add(crud);
  }

  private CrudEditor<Person> createEditor() {
    TextField firstName = new TextField("First name");
    TextField lastName = new TextField("Last name");
    EmailField email = new EmailField("Email");
    TextField profession = new TextField("Profession");
    FormLayout form = new FormLayout(firstName, lastName, email, profession);

    Binder<Person> binder = new Binder<>(Person.class);
    binder.forField(firstName).asRequired().bind(Person::getFirstName, Person::setFirstName);
    binder.forField(lastName).asRequired().bind(Person::getLastName, Person::setLastName);
    binder.forField(email).asRequired().bind(Person::getEmail, Person::setEmail);
    binder.forField(profession).asRequired().bind(Person::getProfession, Person::setProfession);

    return new BinderCrudEditor<>(binder, form);
  }

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

    // Translate headers
    grid.getColumnByKey(FIRST_NAME).setHeader("Etunimi");
    grid.getColumnByKey(LAST_NAME).setHeader("Sukunimi");
    grid.getColumnByKey(EMAIL).setHeader("Sähköposti");
    grid.getColumnByKey(PROFESSION).setHeader("Ammatti");
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

  private void setupI18n() {
    // tag::snippet[]
    CrudI18n i18n = CrudI18n.createDefault();

    i18n.setNewItem("Luo uusi");
    i18n.setEditItem("Muuta tietoja");
    i18n.setSaveItem("Tallenna");
    i18n.setCancel("Peruuta");
    i18n.setDeleteItem("Poista...");
    i18n.setEditLabel("Muokkaa");

    CrudI18n.Confirmations.Confirmation delete = i18n.getConfirm().getDelete();
    delete.setTitle("Poista kohde");
    delete.setContent("Haluatko varmasti poistaa tämän kohteen? Poistoa ei voi perua.");
    delete.getButton().setConfirm("Poista");
    delete.getButton().setDismiss("Peruuta");

    CrudI18n.Confirmations.Confirmation cancel = i18n.getConfirm().getCancel();
    cancel.setTitle("Hylkää muutokset");
    cancel.setContent("Kohteessa on tallentamattomia muutoksia.");
    cancel.getButton().setConfirm("Hylkää");
    cancel.getButton().setDismiss("Peruuta");

    crud.setI18n(i18n);
    // end::snippet[]
  }
  public static class Exporter extends DemoExporter<CrudLocalization> {} // hidden-source-line
}
