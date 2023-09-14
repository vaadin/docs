package com.vaadin.demo.component.icons;

import com.vaadin.demo.flow.routing.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("svg-standalone")
public class SvgStandalone extends Div {

  public SvgStandalone() {

    // tag::snippet[]
    StreamResource iconResource = new StreamResource("code-branch.svg",
        () -> getClass().getResourceAsStream("/icons/code-branch.svg"));
    SvgIcon icon = new SvgIcon(iconResource);
    // end::snippet[]

    add(icon);
  }

  public static class Exporter extends DemoExporter<SvgStandalone> { // hidden-source-line
  }
}
