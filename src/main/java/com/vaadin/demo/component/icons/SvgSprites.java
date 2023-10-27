package com.vaadin.demo.component.icons;

import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("svg-sprites")
public class SvgSprites extends Div {

  public SvgSprites() {
    HorizontalLayout layout = new HorizontalLayout();
    layout.setSpacing(true);
    layout.addClassName("items-center");

    // tag::snippet[]
    StreamResource iconResource = new StreamResource("solid.svg",
        () -> getClass().getResourceAsStream("/icons/solid.svg"));

    SvgIcon codeBranchIcon = new SvgIcon(iconResource, "code-branch");
    SvgIcon userIcon = new SvgIcon(iconResource, "user");
    // end::snippet[]

    layout.add(codeBranchIcon, userIcon);
    add(layout);
  }

  public static class Exporter extends DemoExporter<SvgSprites> { // hidden-source-line
  }
}
