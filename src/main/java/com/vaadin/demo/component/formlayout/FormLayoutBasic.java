package com.vaadin.demo.component.formlayout;

import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.formlayout.FormLayout.ResponsiveStep;
import com.vaadin.flow.component.html.Div;
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
    TextField username = new TextField("Username");
    PasswordField password = new PasswordField("Password");
    PasswordField confirmPassword = new PasswordField("Confirm password");

    FormLayout formLayout = new FormLayout();
    formLayout.add(
            firstName, lastName,
            username,
            password, confirmPassword
    );
    formLayout.setResponsiveSteps(
            // Use one column by default
            new ResponsiveStep("0", 1),
            // Use two columns, if layout's width exceeds 500px
            new ResponsiveStep("500px", 2)
    );
    // Stretch the username field over 2 columns
    formLayout.setColspan(username, 2);
    // end::snippet[]

    add(formLayout);
  }
  public static class Exporter extends DemoExporter<FormLayoutBasic> { // hidden-source-line
  } // hidden-source-line
}
