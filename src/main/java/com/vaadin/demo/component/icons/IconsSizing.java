package com.vaadin.demo.component.icons;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("icons-sizing")
public class IconsSizing extends Div {

    public IconsSizing() {
        HorizontalLayout layout = new HorizontalLayout();
        layout.setSpacing(true);
        layout.addClassName("items-end");

        // tag::snippet[]
        SvgIcon iconDefaultSize = new SvgIcon("/icons/code-branch.svg", "svg-branch.svg");

        SvgIcon iconLumoSize = new SvgIcon("/icons/code-branch.svg", "svg-branch.svg");
        iconLumoSize.setSize("var(--lumo-icon-size-l)");

        SvgIcon iconPxSize = new SvgIcon("/icons/code-branch.svg", "svg-branch.svg");
        iconPxSize.setSize("48px");

        layout.add(iconDefaultSize, iconLumoSize, iconPxSize);
        // end::snippet[]
        add(layout);
    }

    public static class Exporter extends DemoExporter<IconsSizing> { // hidden-source-line
    } // hidden-source-line
}
