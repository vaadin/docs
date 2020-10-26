package com.vaadin.demo.component.emailfield;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("email-field-basic")
public class EmailFieldBasic extends Div {

  public EmailFieldBasic() {
    // tag::snippet[]
    EmailField emailField = new EmailField("Email");
    emailField.setClearButtonVisible(true);
    emailField.setErrorMessage("Please enter a valid email address");
    add(emailField);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<EmailFieldBasic> { // hidden-full-source-line
  } // hidden-full-source-line
}
