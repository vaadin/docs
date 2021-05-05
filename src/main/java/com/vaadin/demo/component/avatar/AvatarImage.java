package com.vaadin.demo.component.avatar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;

@Route("avatar-image")
public class AvatarImage extends Div {

  private Person person = DataService.getPeople(1).get(0);

  public AvatarImage() {
    String name = person.getFirstName() + " " + person.getLastName();
    String pictureUrl = person.getPictureUrl();

    // tag::snippet[]
    Avatar user = new Avatar(name);
    user.setImage(pictureUrl);

    Avatar company = new Avatar("Company Inc.");
    StreamResource imageResource = new StreamResource(
      "company-logo.png",
      () -> getClass().getResourceAsStream("/images/company-logo.png"));
    company.setImageResource(imageResource);
    // end::snippet[]

    add(user, company);
  }

  public static class Exporter extends DemoExporter<AvatarImage> { // hidden-source-line
  } // hidden-source-line
}
