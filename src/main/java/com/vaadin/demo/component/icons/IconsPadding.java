package com.vaadin.demo.component.icons;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("icons-padding")
public class IconsPadding extends Div {

    public IconsPadding() {
        HorizontalLayout layout = new HorizontalLayout();
        layout.setSpacing(true);
        layout.addClassName("items-end");

        // tag::snippet[]
        SvgIcon iconDefaultSize = new SvgIcon("/icons/code-branch.svg");

        SvgIcon iconSmallPadding = new SvgIcon("/icons/code-branch.svg");
        iconSmallPadding.getStyle().set("padding", "0.25em");

        SvgIcon iconLargePadding = new SvgIcon("/icons/code-branch.svg");
        iconLargePadding.getStyle().set("padding", "0.5em");

        layout.add(iconDefaultSize, iconSmallPadding, iconLargePadding);
        // end::snippet[]
        add(layout);
    }

    public static class Exporter extends DemoExporter<IconsPadding> { // hidden-source-line
    } // hidden-source-line
}
