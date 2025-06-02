package com.vaadin.demo.component.formlayout;

import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("form-layout-labels-aside")
public class FormLayoutLabelsAside extends Div {

    public FormLayoutLabelsAside() {
        // tag::snippet[]
        TextField firstName = new TextField();
        TextField lastName = new TextField();
        EmailField email = new EmailField();

        FormLayout formLayout = new FormLayout();
        formLayout.setAutoResponsive(true);
        formLayout.setLabelsAside(true);
        formLayout.addFormItem(firstName, "First name");
        formLayout.addFormItem(lastName, "Last name");
        formLayout.addFormItem(email, "Email address");
        // end::snippet[]
        formLayout.setWidthFull();

        SplitLayout splitLayout = new SplitLayout(formLayout, new Div());
        add(splitLayout);
    }

    public static class Exporter extends DemoExporter<FormLayoutLabelsAside> { // hidden-source-line
    } // hidden-source-line
}
