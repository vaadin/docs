package com.vaadin.demo.component.stepper;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.stepper.Step;
import com.vaadin.flow.component.stepper.Stepper;
import com.vaadin.flow.router.Route;

@Route("stepper-states")
public class StepperStates extends Div {

    public StepperStates() {
        // tag::snippet[]
        Stepper stepper = new Stepper();
        
        Step completed = new Step("Completed step");
        completed.setState(Step.State.COMPLETED);
        
        Step active = new Step("Active step");
        active.setState(Step.State.ACTIVE);
        
        Step error = new Step("Error step");
        error.setState(Step.State.ERROR);
        
        Step inactive = new Step("Inactive step");
        
        stepper.add(completed, active, error, inactive);
        // end::snippet[]

        add(stepper);
    }

    public static class Exporter extends DemoExporter<StepperStates> { // hidden-source-line
    } // hidden-source-line
}