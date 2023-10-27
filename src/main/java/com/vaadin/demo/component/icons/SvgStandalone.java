package com.vaadin.demo.component.icons;

import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("svg-standalone")
public class SvgStandalone extends Div {

  public SvgStandalone() {
    // As an alternative to using a StreamResource, you can use any relative or absolute URL.
    // For example, if you have the icons in your "myapp" application theme, you could use "/themes/myapp/code-branch.svg"
    // tag::snippet[]
    StreamResource iconResource = new StreamResource("code-branch.svg",
        () -> getClass().getResourceAsStream("/icons/code-branch.svg"));
    SvgIcon icon = new SvgIcon(iconResource);
    // end::snippet[]

    add(icon);
  }

  public static class Exporter extends DemoExporter<SvgStandalone> { // hidden-source-line
  } // hidden-source-line
}
