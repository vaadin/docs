package com.vaadin.demo.component.emailfield;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("email-field-pattern")
public class EmailFieldPattern extends Div {

  public EmailFieldPattern() {
    // tag::snippet[]
    EmailField emailField = new EmailField();
    emailField.setLabel("Email address");
    emailField.getElement().setAttribute("name", "email");
    emailField.setPlaceholder("username@example.com");
    emailField.setErrorMessage("Please enter a valid example.com email address");
    emailField.setClearButtonVisible(true);
    emailField.setPattern("^.+@example\\.com$");
    add(emailField);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<EmailFieldPattern> { // hidden-source-line
  } // hidden-source-line
}
