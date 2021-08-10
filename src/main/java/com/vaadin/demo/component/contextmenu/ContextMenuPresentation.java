package com.vaadin.demo.component.contextmenu;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.contextmenu.GridContextMenu;
import com.vaadin.flow.component.grid.contextmenu.GridMenuItem;
import com.vaadin.flow.component.grid.contextmenu.GridSubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Hr;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

import java.util.List;
import java.util.Random;

@Route("context-menu-presentation")
public class ContextMenuPresentation extends Div {

  private List<Person> people = DataService.getPeople(10);
  private Random random = new Random(1);

  public ContextMenuPresentation() {
    Grid<Person> grid = new Grid();
    grid.setAllRowsVisible(true);
    grid.setItems(people.subList(0, 5));

    grid.addColumn(person -> person.getFullName())
        .setHeader("Applicant");
    grid.addColumn(person -> person.getEmail())
        .setHeader("Email");
    grid.addColumn(person -> person.getAddress().getPhone())
        .setHeader("Phone number");

    // tag::snippet1[]
    GridContextMenu<Person> menu = grid.addContextMenu();
    // end::snippet1[]

    GridMenuItem<Person> open = menu.addItem("Open", event -> {});
    open.addComponentAsFirst(createIcon(VaadinIcon.FILE_SEARCH));

    // tag::snippet2[]
    GridMenuItem<Person> assign = menu.addItem("Assign");
    assign.addComponentAsFirst(createIcon(VaadinIcon.USER_CHECK));

    GridSubMenu<Person> assignSubMenu = assign.getSubMenu();
    people.subList(5, 10).forEach(person -> {
      assignSubMenu.addItem(createPersonItem(person), event -> {});
    });
    // end::snippet2[]
    menu.add(new Hr());

    GridMenuItem<Person> delete = menu.addItem("Delete", event -> {});
    delete.addComponentAsFirst(createIcon(VaadinIcon.TRASH));

    add(grid);
  }

  private Component createIcon(VaadinIcon vaadinIcon) {
    Icon icon = vaadinIcon.create();
    icon.getStyle()
      .set("color", "var(--lumo-secondary-text-color)")
      .set("margin-inline-end", "var(--lumo-space-s")
      .set("padding", "var(--lumo-space-xs");
    return icon;
  }

  // tag::snippet3[]
  private Component createPersonItem(Person person) {
    Avatar avatar = new Avatar();
    avatar.setImage(person.getPictureUrl());
    avatar.setName(person.getFirstName());

    Span name = new Span(person.getFullName());
    Span apps = new Span(getApplicationCount());
    apps.getStyle()
      .set("color", "var(--lumo-secondary-text-color)")
      .set("font-size", "var(--lumo-font-size-s)");

    VerticalLayout verticalLayout = new VerticalLayout(
      name,
      apps
    );
    verticalLayout.setPadding(false);
    verticalLayout.setSpacing(false);

    HorizontalLayout horizontalLayout = new HorizontalLayout(
      avatar,
      verticalLayout
    );
    horizontalLayout.setAlignItems(FlexComponent.Alignment.CENTER);
    horizontalLayout.getStyle().set("line-height", "var(--lumo-line-height-m)");
    return horizontalLayout;
  }
  // end::snippet3[]

  private String getApplicationCount() {
    // Randomised dummy data
    return random.nextInt(20) + 1 + " applications";
  }
  public static class Exporter extends DemoExporter<ContextMenuPresentation> {} // hidden-source-line
}
