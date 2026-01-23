package com.vaadin.demo.component.stepper;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.stepper.Step;
import com.vaadin.flow.component.stepper.Stepper;
import com.vaadin.flow.router.Route;

@Route("stepper-basic")
public class StepperBasic extends Div {

    public StepperBasic() {
        // tag::snippet[]
        Stepper stepper = new Stepper();
        
        Step step1 = new Step("Shipping address", "Enter your shipping details");
        Step step2 = new Step("Billing address", "Enter your billing details");
        Step step3 = new Step("Payment method", "Select payment option");
        Step step4 = new Step("Review order", "Review and confirm your order");
        
        stepper.add(step1, step2, step3, step4);
        // end::snippet[]

        add(stepper);
    }

    public static class Exporter extends DemoExporter<StepperBasic> { // hidden-source-line
    } // hidden-source-line
}