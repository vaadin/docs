package com.vaadin.demo.component.icons;

import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("svg-standalone")
public class SvgStandalone extends Div {

    public SvgStandalone() {
        // tag::snippet[]
        SvgIcon icon = new SvgIcon("/icons/code-branch.svg");
        // end::snippet[]

        add(icon);
    }

    public static class Exporter extends DemoExporter<SvgStandalone> { // hidden-source-line
    } // hidden-source-line
}
