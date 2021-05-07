package com.vaadin.demo.component.avatar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("avatar-basic")
public class AvatarBasic extends Div {

  private Person person = DataService.getPeople(1).get(0);

  public AvatarBasic() {
    String name = person.getFirstName() + " " + person.getLastName();
    String pictureUrl = person.getPictureUrl();

    // tag::snippet[]
    Avatar avatarBasic = new Avatar();

    Avatar avatarName = new Avatar(name);

    Avatar avatarImage = new Avatar(name);
    avatarImage.setImage(pictureUrl);
    // end::snippet[]

    add(avatarBasic, avatarName, avatarImage);
  }

  public static class Exporter extends DemoExporter<AvatarBasic> { // hidden-source-line
  } // hidden-source-line
}
