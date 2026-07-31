package com.vaadin.demo.component.switchcomponent;

import com.vaadin.flow.component.checkbox.Switch;
import com.vaadin.flow.component.checkbox.Switch.SwitchI18n;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("switch-validation")
public class SwitchValidation extends Div {

    public SwitchValidation() {
        // tag::snippet[]
        Switch twoFactor = new Switch("Two-factor authentication");
        twoFactor.setRequiredIndicatorVisible(true);
        twoFactor.setI18n(new SwitchI18n().setRequiredErrorMessage(
                "Two-factor authentication can't be turned off"));
        // end::snippet[]
        twoFactor.setHelperText("Required by your workspace security policy");

        add(twoFactor);
    }

    public static class Exporter extends DemoExporter<SwitchValidation> { // hidden-source-line
    } // hidden-source-line
}
