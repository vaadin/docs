package com.vaadin.demo.component.stepper;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.stepper.Step;
import com.vaadin.flow.component.stepper.Stepper;
import com.vaadin.flow.router.Route;

@Route("stepper-custom")
public class StepperCustom extends Div {

    public StepperCustom() {
        // tag::snippet[]
        Stepper stepper = new Stepper();
        
        Step step1 = new Step();
        step1.add(new Icon(VaadinIcon.USER), new Span("Account"));
        step1.setState(Step.State.COMPLETED);
        
        Step step2 = new Step();
        step2.add(new Icon(VaadinIcon.ENVELOPE), new Span("Email verification"));
        step2.setState(Step.State.ACTIVE);
        
        Step step3 = new Step();
        step3.add(new Icon(VaadinIcon.LOCK), new Span("Security"));
        
        Step step4 = new Step();
        step4.add(new Icon(VaadinIcon.CHECK), new Span("Complete"));
        
        stepper.add(step1, step2, step3, step4);
        // end::snippet[]

        add(stepper);
    }

    public static class Exporter extends DemoExporter<StepperCustom> { // hidden-source-line
    } // hidden-source-line
}