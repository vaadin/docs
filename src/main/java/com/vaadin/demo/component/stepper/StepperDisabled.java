package com.vaadin.demo.component.stepper;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.stepper.Step;
import com.vaadin.flow.component.stepper.Stepper;
import com.vaadin.flow.router.Route;

@Route("stepper-disabled")
public class StepperDisabled extends Div {

    public StepperDisabled() {
        // tag::snippet[]
        Stepper stepper = new Stepper();
        
        Step step1 = Step.withHref("Step 1", "#/step1");
        step1.setState(Step.State.COMPLETED);
        
        Step step2 = Step.withHref("Step 2 (Unavailable)", "#/step2");
        step2.setEnabled(false);
        step2.setState(Step.State.ACTIVE);
        
        Step step3 = Step.withHref("Step 3", "#/step3");
        
        stepper.add(step1, step2, step3);
        // end::snippet[]

        add(stepper);
    }

    public static class Exporter extends DemoExporter<StepperDisabled> { // hidden-source-line
    } // hidden-source-line
}