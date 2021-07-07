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
    TextField firstName = new TextField("First name");
    TextField lastName = new TextField("Last name");
    TextField username = new TextField("Username");
    PasswordField password = new PasswordField("Password");
    PasswordField confirmPassword = new PasswordField("Confirm password");

    // tag::snippet[]
    FormLayout formLayout = new FormLayout();
    formLayout.add(
            firstName, lastName,
            username,
            password, confirmPassword
    );
    formLayout.setColspan(username, 2);
    formLayout.setResponsiveSteps(
            new ResponsiveStep("0", 1),
            new ResponsiveStep("20em", 2)
    );
    add(formLayout);
    // end::snippet[]
  }
  public static class Exporter extends DemoExporter<FormLayoutBasic> { // hidden-source-line
  } // hidden-source-line
}
