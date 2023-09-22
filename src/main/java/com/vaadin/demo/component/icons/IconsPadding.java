package com.vaadin.demo.component.icons;

import com.vaadin.demo.flow.routing.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("icons-padding")
public class IconsPadding extends Div {

  public IconsPadding() {
    HorizontalLayout layout = new HorizontalLayout();
    layout.setSpacing(true);
    layout.addClassName("items-end");

    StreamResource codeBranch = new StreamResource("svg-branch.svg",
        () -> getClass().getResourceAsStream("/icons/code-branch.svg"));
    // tag::snippet[]
    SvgIcon iconDefaultSize = new SvgIcon(codeBranch);

    SvgIcon iconSmallPadding = new SvgIcon(codeBranch);
    iconSmallPadding.getStyle().set("padding", "0.25em");

    SvgIcon iconLargePadding = new SvgIcon(codeBranch);
    iconLargePadding.getStyle().set("padding", "0.5em");

    layout.add(iconDefaultSize, iconSmallPadding, iconLargePadding);
    // end::snippet[]
    add(layout);
  }

  public static class Exporter extends DemoExporter<IconsPadding> { // hidden-source-line
  }
}
