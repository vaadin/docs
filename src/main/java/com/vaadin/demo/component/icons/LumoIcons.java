package com.vaadin.demo.component.icons;

import com.vaadin.demo.flow.routing.Route;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("lumo-icons")
public class LumoIcons extends Div {

  public LumoIcons() {
    HorizontalLayout layout = new HorizontalLayout();
    layout.setSpacing(true);
    layout.addClassName("items-center");

    // tag::snippet[]
    Icon phoneIcon = new Icon("lumo", "photo");
    Icon calendarIcon = new Icon("lumo", "calendar");
    Icon alarmIcon = new Icon("lumo", "clock");
    Button button = new Button(new Icon("lumo", "bell"));

    layout.add(phoneIcon, calendarIcon, alarmIcon, button);
    // end::snippet[]

    add(layout);
  }

  public static class Exporter extends DemoExporter<LumoIcons> { // hidden-source-line
  }
}
