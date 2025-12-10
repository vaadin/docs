package com.vaadin.demo.component.icons;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("icons-sizing")
public class IconsSizing extends Div {

    public IconsSizing() {
        HorizontalLayout layout = new HorizontalLayout();
        layout.setSpacing(true);
        layout.setAlignItems(FlexComponent.Alignment.END);

        // tag::snippet[]
        SvgIcon iconDefaultSize = new SvgIcon("/icons/code-branch.svg", "svg-branch.svg");

        SvgIcon iconLumoSize = new SvgIcon("/icons/code-branch.svg", "svg-branch.svg");
        iconLumoSize.setSize("2rem");

        SvgIcon iconPxSize = new SvgIcon("/icons/code-branch.svg", "svg-branch.svg");
        iconPxSize.setSize("3rem");

        layout.add(iconDefaultSize, iconLumoSize, iconPxSize);
        // end::snippet[]
        add(layout);
    }

    public static class Exporter extends DemoExporter<IconsSizing> { // hidden-source-line
    } // hidden-source-line
}
