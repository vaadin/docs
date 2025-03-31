package com.vaadin.demo.component.formlayout;

import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("form-layout-basic")
public class FormLayoutBasic extends Div {

    public FormLayoutBasic() {
        // tag::snippet[]
        TextField firstName = new TextField("First name");
        TextField lastName = new TextField("Last name");
        EmailField email = new EmailField("Email address");
        PasswordField password = new PasswordField("Password");
        PasswordField confirmPassword = new PasswordField("Confirm password");

        FormLayout formLayout = new FormLayout();
        formLayout.setAutoResponsive(true);
        formLayout.addFormRow(firstName, lastName);
        formLayout.addFormRow(email);
        formLayout.addFormRow(password, confirmPassword);
        // end::snippet[]

        formLayout.setWidthFull();
        SplitLayout splitLayout = new SplitLayout(formLayout, new Div());
        add(splitLayout);
    }

    public static class Exporter extends DemoExporter<FormLayoutBasic> { // hidden-source-line
    } // hidden-source-line
}
