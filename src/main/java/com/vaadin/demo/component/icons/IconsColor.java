package com.vaadin.demo.component.icons;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.FontIcon;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("icons-color")
public class IconsColor extends Div {

    public IconsColor() {
        HorizontalLayout layout = new HorizontalLayout();
        layout.setSpacing(true);
        layout.setAlignItems(FlexComponent.Alignment.CENTER);

        // tag::snippet[]
        SvgIcon svgIcon = new SvgIcon("/icons/code-branch.svg", "svg-branch.svg");
        svgIcon.setColor("red");

        FontIcon fontIcon = new FontIcon("fa", "fa-user");
        fontIcon.setColor("red");

        layout.add(svgIcon, fontIcon);
        // end::snippet[]
        add(layout);
    }

    public static class Exporter extends DemoExporter<IconsColor> { // hidden-source-line
    } // hidden-source-line
}
