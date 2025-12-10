package com.vaadin.demo.component.icons;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("icons-padding")
public class IconsPadding extends Div {

    public IconsPadding() {
        HorizontalLayout layout = new HorizontalLayout();
        layout.addClassName("icons-padding-example");
        layout.setSpacing(true);
        layout.setAlignItems(FlexComponent.Alignment.END);

        // tag::snippet[]
        SvgIcon icon = new SvgIcon("/icons/code-branch.svg");
        icon.getStyle().set("--vaadin-icon-size", "3rem");

        SvgIcon iconSmallPadding = new SvgIcon("/icons/code-branch.svg");
        iconSmallPadding.getStyle().set("--vaadin-icon-size", "3rem");
        iconSmallPadding.getStyle().set("--vaadin-icon-visual-size", "2rem");

        SvgIcon iconLargePadding = new SvgIcon("/icons/code-branch.svg");
        iconLargePadding.getStyle().set("--vaadin-icon-size", "3rem");
        iconLargePadding.getStyle().set("--vaadin-icon-visual-size", "1rem");

        layout.add(icon, iconSmallPadding, iconLargePadding);
        // end::snippet[]
        add(layout);
    }

    public static class Exporter extends DemoExporter<IconsPadding> { // hidden-source-line
    } // hidden-source-line
}
