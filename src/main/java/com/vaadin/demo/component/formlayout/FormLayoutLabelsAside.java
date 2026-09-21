package com.vaadin.demo.component.formlayout;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.formlayout.FormLayout.FormItem;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("form-layout-labels-aside")
public class FormLayoutLabelsAside extends Div {

    public FormLayoutLabelsAside() {
        // tag::snippet[]
        EmailField email = new EmailField("Email");
        PasswordField password = new PasswordField("Password");
        Checkbox subscribe = new Checkbox("Subscribe");
        Button register = new Button("Register");
        register.setWidthFull();

        FormLayout formLayout = new FormLayout();
        formLayout.setAutoResponsive(true);
        formLayout.setLabelsAside(true);
        formLayout.add(email, password, subscribe);
        formLayout.add(new FormItem(register));
        // end::snippet[]
        formLayout.setWidthFull();

        SplitLayout splitLayout = new SplitLayout(formLayout, new Div());
        add(splitLayout);
    }

    public static class Exporter extends DemoExporter<FormLayoutLabelsAside> { // hidden-source-line
    } // hidden-source-line
}
