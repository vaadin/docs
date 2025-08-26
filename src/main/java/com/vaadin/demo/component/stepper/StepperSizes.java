package com.vaadin.demo.component.stepper;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.stepper.Step;
import com.vaadin.flow.component.stepper.Stepper;
import com.vaadin.flow.component.stepper.StepperVariant;
import com.vaadin.flow.router.Route;

@Route("stepper-sizes")
public class StepperSizes extends Div {

    public StepperSizes() {
        // tag::snippet[]
        Stepper stepper = new Stepper();
        stepper.addThemeVariants(StepperVariant.SMALL);
        
        Step step1 = new Step("Step 1");
        step1.setState(Step.State.COMPLETED);
        
        Step step2 = new Step("Step 2");
        step2.setState(Step.State.ACTIVE);
        
        Step step3 = new Step("Step 3");
        
        Step step4 = new Step("Step 4");
        
        stepper.add(step1, step2, step3, step4);
        // end::snippet[]

        add(stepper);
    }

    public static class Exporter extends DemoExporter<StepperSizes> { // hidden-source-line
    } // hidden-source-line
}