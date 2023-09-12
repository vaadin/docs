package com.vaadin.demo.component.icons;

import com.vaadin.demo.flow.routing.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("icons-sizing")
public class IconsSizing extends Div {

  public IconsSizing() {
    HorizontalLayout layout = new HorizontalLayout();
    layout.setSpacing(true);
    layout.addClassName("items-center");

    // tag::snippet[]
    StreamResource codeBranch = new StreamResource("svg-branch.svg",
        () -> getClass().getResourceAsStream("/icons/code-branch.svg"));
    SvgIcon iconDefaultSize = new SvgIcon(codeBranch);

    SvgIcon iconLumoSize = new SvgIcon(codeBranch);
    iconLumoSize.setSize("var(--lumo-icon-size-l)");

    SvgIcon iconPxSize = new SvgIcon(codeBranch);
    iconPxSize.setSize("48px");

    layout.add(iconDefaultSize, iconLumoSize, iconPxSize);
    // end::snippet[]
    add(layout);
  }

  public static class Exporter extends DemoExporter<IconsSizing> { // hidden-source-line
  }
}
