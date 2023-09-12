package com.vaadin.demo.component.icons;

import com.vaadin.demo.flow.routing.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.FontIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("icon-fonts")
public class IconFonts extends Div {

  public IconFonts() {
    HorizontalLayout layout = new HorizontalLayout();
    layout.setSpacing(true);
    layout.addClassName("items-center");

    // tag::snippet[]
    FontIcon homeIcon = new FontIcon("icomoon", "icomoon-home");
    FontIcon userIcon = new FontIcon("icomoon", "icomoon-user");
    FontIcon cogIcon = new FontIcon("icomoon", "icomoon-cog");

    layout.add(homeIcon, userIcon, cogIcon);
    // end::snippet[]
    add(layout);
  }

  public static class Exporter extends DemoExporter<IconFonts> { // hidden-source-line
  }
}
