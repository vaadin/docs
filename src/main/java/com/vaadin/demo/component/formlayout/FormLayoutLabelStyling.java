package com.vaadin.demo.component.formlayout;

import com.vaadin.flow.component.formlayout.FormLayout;
// import com.vaadin.flow.component.formlayout.FormLayout.LabelTextAlign;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("form-layout-label-styling")
public class FormLayoutLabelStyling extends Div {

    public FormLayoutLabelStyling() {
        // tag::snippet[]
        FormLayout formLayout = new FormLayout();
        formLayout.setAutoResponsive(true);
        formLayout.setLabelsAside(true);
        formLayout.add(new TextField("First name"), new TextField("Last name"),
                new EmailField("Email address"));

        formLayout.setLabelWidth("10em");
        formLayout.setLabelSpacing("2em");
        // formLayout.setLabelTextAlign(LabelTextAlign.END);
        // end::snippet[]

        add(formLayout);
    }

    public static class Exporter extends DemoExporter<FormLayoutLabelStyling> { // hidden-source-line
    } // hidden-source-line
}
