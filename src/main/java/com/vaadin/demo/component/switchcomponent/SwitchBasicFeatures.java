package com.vaadin.demo.component.switchcomponent;

import com.vaadin.flow.component.checkbox.Switch;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("switch-basic-features")
public class SwitchBasicFeatures extends Div {

    public SwitchBasicFeatures() {
        // tag::snippet[]
        Switch autosave = new Switch("Autosave");
        autosave.setHelperText("Automatically save changes as you work");
        autosave.setTooltipText("Last saved 5 minutes ago");

        add(autosave);
        // end::snippet[]
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<SwitchBasicFeatures> { // hidden-source-line
    } // hidden-source-line
}
