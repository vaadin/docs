package com.vaadin.demo.component.avatar;

import com.vaadin.demo.DemoExporter;
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.avatar.AvatarVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("avatar-sizes")
public class AvatarSizes extends Div {

  private Person person = DataService.getPeople(1).get(0);

  public AvatarSizes() {
    String name = person.getFirstName() + " " + person.getLastName();

    // tag::snippet[]
    Avatar xl = new Avatar(name);
    xl.addThemeVariants(AvatarVariant.LUMO_XLARGE);

    Avatar l = new Avatar(name);
    l.addThemeVariants(AvatarVariant.LUMO_LARGE);

    Avatar s = new Avatar(name);
    s.addThemeVariants(AvatarVariant.LUMO_SMALL);

    Avatar xs = new Avatar(name);
    xs.addThemeVariants(AvatarVariant.LUMO_XSMALL);
    // end::snippet[]

    add(xl, l, s, xs);
  }

  public static class Exporter extends DemoExporter<AvatarSizes> { // hidden-source-line
  } // hidden-source-line
}
