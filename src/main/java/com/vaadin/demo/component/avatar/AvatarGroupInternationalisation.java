package com.vaadin.demo.component.avatar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.avatar.AvatarGroup;
import com.vaadin.flow.component.avatar.AvatarGroup.AvatarGroupI18n;
import com.vaadin.flow.component.avatar.AvatarGroup.AvatarGroupItem;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("avatar-group-internationalisation")
public class AvatarGroupInternationalisation extends Div {

  private List<Person> people = DataService.getPeople(2);

  public AvatarGroupInternationalisation() {
    // tag::snippet[]
    AvatarGroupI18n i18n = new AvatarGroupI18n();
    i18n.setAnonymous("Anonyymi");
    i18n.setManyActiveUsers("Yksi käyttäjä aktiivisena");
    i18n.setOneActiveUser("{count} käyttäjää aktiivisena");

    AvatarGroup avatarGroup = new AvatarGroup();
    avatarGroup.setI18n(i18n);

    // Add anonymous user
    avatarGroup.add(new AvatarGroupItem());

    for (Person person : people) {
      String name = person.getFirstName() + " " + person.getLastName();
      AvatarGroupItem avatar = new AvatarGroupItem(name);
      avatarGroup.add(avatar);
    }
    // end::snippet[]

    add(avatarGroup);
  }

  public static class Exporter extends DemoExporter<AvatarGroupInternationalisation> { // hidden-source-line
  } // hidden-source-line
}
