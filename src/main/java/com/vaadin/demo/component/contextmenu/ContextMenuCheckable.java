package com.vaadin.demo.component.contextmenu;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.contextmenu.ContextMenu;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("context-menu-checkable")
public class ContextMenuCheckable extends Div {

  private final ContextMenu menu;
  private final Span assignee;

  public ContextMenuCheckable() {
    // tag::snippet1[]
    assignee = new Span();
    menu = new ContextMenu();
    menu.setTarget(assignee);

    List<Person> people = DataService.getPeople(5);
    for (Person person : people) {
      MenuItem menuItem = menu.addItem(person.getFullName(), event -> {
        setAssignee(person);
      });
      menuItem.setCheckable(true);
    }

    setAssignee(people.get(0));
    // end::snippet1[]

    Div assigneeInfo = new Div(new Span("Assignee: "), assignee);
    assignee.getStyle().set("font-weight", "bold");

    add(assigneeInfo);
  }

  // tag::snippet2[]
  private void setAssignee(Person person) {
    // Update checked state of menu items
    menu.getItems().forEach(
            item -> item.setChecked(item.getText().equals(person.getFullName()))
    );

    assignee.setText(person.getFullName());
  }
  // end::snippet2[]
  public static class Exporter extends DemoExporter<ContextMenuCheckable> {} // hidden-source-line
}
