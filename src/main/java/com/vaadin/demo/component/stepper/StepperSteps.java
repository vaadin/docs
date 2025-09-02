package com.vaadin.demo.component.stepper;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.stepper.Step;
import com.vaadin.flow.component.stepper.Stepper;
import com.vaadin.flow.router.Route;

@Route("stepper-steps")
public class StepperSteps extends Div {

    public StepperSteps() {
        // tag::snippet[]
        Stepper stepper = new Stepper();
        
        Step step1 = new Step("Personal details", "Name, email and phone");
        step1.setState(Step.State.COMPLETED);
        
        Step step2 = new Step("Address", "Street, city and postal code");
        step2.setState(Step.State.ACTIVE);
        
        Step step3 = new Step("Payment", "Credit card or PayPal");
        
        Step step4 = new Step("Confirmation", "Review and submit");
        
        stepper.add(step1, step2, step3, step4);
        // end::snippet[]

        add(stepper);
    }

    public static class Exporter extends DemoExporter<StepperSteps> { // hidden-source-line
    } // hidden-source-line
}