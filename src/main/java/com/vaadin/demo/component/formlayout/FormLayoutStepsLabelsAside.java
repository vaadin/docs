package com.vaadin.demo.component.formlayout;

import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("form-layout-steps-labels-aside")
public class FormLayoutStepsLabelsAside extends Div {

    public FormLayoutStepsLabelsAside() {
        // tag::snippet[]
        TextField firstName = new TextField();
        TextField lastName = new TextField();
        EmailField email = new EmailField();

        FormLayout formLayout = new FormLayout();
        formLayout.setLabelWidth("92px");
        formLayout.addFormItem(firstName, "First name");
        formLayout.addFormItem(lastName, "Last name");
        formLayout.addFormItem(email, "Email address");

        // This is the default configuration shown for demonstration purposes
        // @formatter:off hidden-source-line
        // formLayout.setResponsiveSteps(
        //         new ResponsiveStep("0", 1, ResponsiveStep.LabelsPosition.TOP),
        //         new ResponsiveStep("20em", 1),
        //         new ResponsiveStep("40em", 2));
        // @formatter:on hidden-source-line
        // end::snippet[]

        SplitLayout splitLayout = new SplitLayout(formLayout, new Div());
        add(splitLayout);
    }

    public static class Exporter extends DemoExporter<FormLayoutStepsLabelsAside> { // hidden-source-line
    } // hidden-source-line
}
