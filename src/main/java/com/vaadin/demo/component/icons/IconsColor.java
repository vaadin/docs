package com.vaadin.demo.component.icons;

import com.vaadin.demo.flow.routing.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.FontIcon;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("icons-color")
public class IconsColor extends Div {

  public IconsColor() {
    HorizontalLayout layout = new HorizontalLayout();
    layout.setSpacing(true);
    layout.addClassName("items-center");

    // tag::snippet[]
    StreamResource codeBranch = new StreamResource("svg-branch.svg",
        () -> getClass().getResourceAsStream("/icons/code-branch.svg"));
    SvgIcon svgIcon = new SvgIcon(codeBranch);
    svgIcon.setColor("red");

    FontIcon fontIcon = new FontIcon("icomoon", "icomoon-home");
    fontIcon.setColor("red");

    layout.add(svgIcon, fontIcon);
    // end::snippet[]
    add(layout);
  }

  public static class Exporter extends DemoExporter<IconsColor> { // hidden-source-line
  }
}
