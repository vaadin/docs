package com.vaadin.demo.component.avatar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("avatar-abbreviation")
public class AvatarAbbreviation extends Div {

  public AvatarAbbreviation() {
    // tag::snippet[]
    Avatar avatarName = new Avatar("Augusta Ada King");

    Avatar avatarAbbr = new Avatar("Augusta Ada King");
    avatarAbbr.setAbbreviation("AK");
    // end::snippet[]

    add(avatarName, avatarAbbr);
  }
  public static class Exporter extends DemoExporter<AvatarAbbreviation> {} // hidden-source-line
}
