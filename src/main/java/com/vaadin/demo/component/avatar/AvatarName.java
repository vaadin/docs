package com.vaadin.demo.component.avatar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("avatar-name")
public class AvatarName extends Div {

  private Person person = DataService.getPeople(1).get(0);

  public AvatarName() {
    String name = person.getFirstName() + " " + person.getLastName();

    // tag::snippet[]
    Avatar avatarName = new Avatar(name);
    // end::snippet[]

    add(avatarName);
  }

  public static class Exporter extends DemoExporter<AvatarName> { // hidden-source-line
  } // hidden-source-line
}
