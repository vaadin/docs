package com.vaadin.demo.component.stepper;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.stepper.Step;
import com.vaadin.flow.component.stepper.Stepper;
import com.vaadin.flow.router.Route;

@Route("stepper-navigation")
public class StepperNavigation extends Div {

    public StepperNavigation() {
        // tag::snippet[]
        Stepper stepper = new Stepper();
        
        Step step1 = Step.withHref("Account setup", "#/account");
        step1.setState(Step.State.COMPLETED);
        
        Step step2 = Step.withHref("Profile information", "#/profile");
        step2.setState(Step.State.ACTIVE);
        
        Step step3 = Step.withHref("Preferences", "#/preferences");
        
        Step step4 = Step.withHref("Review", "#/review");
        
        stepper.add(step1, step2, step3, step4);
        // end::snippet[]

        add(stepper);
    }

    public static class Exporter extends DemoExporter<StepperNavigation> { // hidden-source-line
    } // hidden-source-line
}