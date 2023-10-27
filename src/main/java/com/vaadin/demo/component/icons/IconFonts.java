package com.vaadin.demo.component.icons;

import com.vaadin.flow.router.Route;
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
    FontIcon codeBranchIcon = new FontIcon("fa", "fa-code-branch");
    FontIcon userIcon =  new FontIcon("fa", "fa-user");

    layout.add(codeBranchIcon, userIcon);
    // end::snippet[]
    add(layout);
  }

  public static class Exporter extends DemoExporter<IconFonts> { // hidden-source-line
  }
}
