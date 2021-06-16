package com.vaadin.demo.component.virtuallist;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.details.Details;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.virtuallist.VirtualList;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.dom.ElementFactory;
import com.vaadin.flow.router.Route;

import java.util.List;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;

@Route("virtual-list-basic")
public class VirtualListBasic extends Div {

  private List<Person> people = DataService.getPeople();

  private ComponentRenderer<Component, Person> personCardRenderer = new ComponentRenderer<>(person -> {
    HorizontalLayout cardLayout = new HorizontalLayout();
    cardLayout.setMargin(true);

    Avatar avatar = new Avatar(person.getFullName(), person.getPictureUrl());
    avatar.setHeight("64px");
    avatar.setWidth("64px");

    VerticalLayout infoLayout = new VerticalLayout();
    infoLayout.setSpacing(false);
    infoLayout.setPadding(false);
    infoLayout.getElement().appendChild(ElementFactory.createStrong(person.getFullName()));
    infoLayout.add(new Div(new Text(person.getProfession())));

    VerticalLayout contactLayout = new VerticalLayout();
    contactLayout.setSpacing(false);
    contactLayout.setPadding(false);
    contactLayout.add(new Div(new Text(person.getEmail())));
    contactLayout.add(new Div(new Text(person.getAddress().getPhone())));
    infoLayout.add(new Details("Contact information", contactLayout));

    cardLayout.add(avatar, infoLayout);
    return cardLayout;
  });

  public VirtualListBasic() {
    // tag::snippet[]
    VirtualList<Person> list = new VirtualList<>();
    list.setItems(people);
    list.setRenderer(personCardRenderer);
    add(list);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<VirtualListBasic> { // hidden-source-line
  } // hidden-source-line
}
