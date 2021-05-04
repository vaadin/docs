package com.vaadin.demo.component.contextmenu;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.Html;
import com.vaadin.flow.component.contextmenu.ContextMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("context-menu-checkable")
public class ContextMenuCheckable extends Div {

  private List<Person> people = DataService.getPeople(5);
  private Span assignee;

  public ContextMenuCheckable() {
    assignee = new Span();
    setAssignee(people.get(0));
    add(assignee);

    // tag::snippet[]
    ContextMenu menu = new ContextMenu();
    menu.setTarget(assignee);

    for (Person person : people) {
      menu.addItem(person.getFullName(), event -> {
        setAssignee(person);
      });
    }
    // end::snippet[]
  }

  private void setAssignee(Person person) {
    assignee.removeAll();
    assignee.add(new Html(
      "<span>Assignee: <b>" + person.getFullName() + "</b></span>"
    ));
  }
  public static class Exporter extends DemoExporter<ContextMenuCheckable> {} // hidden-source-line
}
