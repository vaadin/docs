package com.vaadin.demo.component.icons;

import com.vaadin.demo.flow.routing.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.theme.lumo.LumoIcon;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("icon-basic")
public class IconBasic extends Div {

  public IconBasic() {
    HorizontalLayout layout = new HorizontalLayout();
    layout.setSpacing(true);
    layout.addClassName("items-center");

    // tag::snippet[]
    Icon lumoIcon = LumoIcon.PHOTO.create();
    Icon vaadinIcon = VaadinIcon.PHONE.create();

    layout.add(lumoIcon, vaadinIcon);
    // end::snippet[]
    add(layout);
  }

  public static class Exporter extends DemoExporter<IconBasic> { // hidden-source-line
  } // hidden-source-line
}
