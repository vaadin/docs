package com.vaadin.demo.component.avatar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.avatar.AvatarGroup;
import com.vaadin.flow.component.avatar.AvatarGroup.AvatarGroupItem;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import java.util.List;

@Route("avatar-group-basic")
public class AvatarGroupBasic extends Div {

  private List<Person> people = DataService.getPeople(3);

  public AvatarGroupBasic() {
    // tag::snippet[]
    AvatarGroup avatarGroup = new AvatarGroup();

    for (Person person : people) {
      String name = person.getFirstName() + " " + person.getLastName();
      AvatarGroupItem avatar = new AvatarGroupItem(name);
      avatarGroup.add(avatar);
    }
    // end::snippet[]

    add(avatarGroup);
  }

  public static class Exporter extends DemoExporter<AvatarGroupBasic> { // hidden-source-line
  } // hidden-source-line
}
