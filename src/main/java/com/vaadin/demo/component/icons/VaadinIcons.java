package com.vaadin.demo.component.icons;

import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("vaadin-icons")
public class VaadinIcons extends Div {

  public VaadinIcons() {
    HorizontalLayout layout = new HorizontalLayout();
    layout.setSpacing(true);
    layout.addClassName("items-center");

    // tag::snippet[]
    Icon phoneIcon = VaadinIcon.PHONE.create();
    Icon calendarIcon = VaadinIcon.CALENDAR.create();
    Icon alarmIcon = VaadinIcon.ALARM.create();
    Button button = new Button(VaadinIcon.BELL.create());

    layout.add(phoneIcon, calendarIcon, alarmIcon, button);
    // end::snippet[]

    add(layout);
  }

  public static class Exporter extends DemoExporter<VaadinIcons> { // hidden-source-line
  }
}
