package com.vaadin.demo.component.avatar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.avatar.AvatarGroup;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import java.util.List;

@Route("avatar-group-max-items")
public class AvatarGroupMaxItems extends Div {

  private List<Person> people = DataService.getPeople(6);

  public AvatarGroupMaxItems() {
    // tag::snippet[]
    AvatarGroup avatarGroup = new AvatarGroup();
    avatarGroup.setMaxItemsVisible(3);

    for (Person person : people) {
      String name = person.getFirstName() + " " + person.getLastName();
      AvatarGroup.AvatarGroupItem avatar = new AvatarGroup.AvatarGroupItem(name);
      avatarGroup.add(avatar);
    }
    // end::snippet[]

    add(avatarGroup);
  }

  public static class Exporter extends DemoExporter<AvatarGroupMaxItems> { // hidden-source-line
  } // hidden-source-line
}
