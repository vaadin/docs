package com.vaadin.demo.component.stepper;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.stepper.Step;
import com.vaadin.flow.component.stepper.Stepper;
import com.vaadin.flow.router.Route;

@Route("stepper-router")
public class StepperRouter extends Div {

    public StepperRouter() {
        // tag::snippet[]
        Stepper stepper = new Stepper();
        
        Step step1 = Step.withNavigationTarget("Account", AccountView.class);
        step1.setState(Step.State.COMPLETED);
        
        Step step2 = Step.withNavigationTarget("Profile", ProfileView.class);
        step2.setState(Step.State.ACTIVE);
        
        Step step3 = Step.withNavigationTarget("Settings", SettingsView.class);
        
        Step step4 = Step.withNavigationTarget("Summary", SummaryView.class);
        
        stepper.add(step1, step2, step3, step4);
        // end::snippet[]

        add(stepper);
    }

    // Example view classes (would be actual views in a real application)
    @Route("account")
    static class AccountView extends Div {}
    
    @Route("profile")
    static class ProfileView extends Div {}
    
    @Route("settings")
    static class SettingsView extends Div {}
    
    @Route("summary")
    static class SummaryView extends Div {}

    public static class Exporter extends DemoExporter<StepperRouter> { // hidden-source-line
    } // hidden-source-line
}