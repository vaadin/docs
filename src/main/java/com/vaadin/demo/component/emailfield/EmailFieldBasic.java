package com.vaadin.demo.component.emailfield;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("email-field-basic")
public class EmailFieldBasic extends HorizontalLayout {

  public EmailFieldBasic() {
    setPadding(false);

    // tag::snippet[]
    EmailField validEmailField = new EmailField();
    validEmailField.setLabel("Email address");
    validEmailField.getElement().setAttribute("name", "email");
    validEmailField.setValue("julia.scheider@email.com");
    validEmailField.setErrorMessage("Please enter a valid email address");
    validEmailField.setClearButtonVisible(true);

    EmailField invalidEmailField = new EmailField();
    invalidEmailField.setLabel("Email address");
    invalidEmailField.getElement().setAttribute("name", "email");
    invalidEmailField.setValue("This is not an email");
    invalidEmailField.setErrorMessage("Please enter a valid email address");
    invalidEmailField.setClearButtonVisible(true);
    invalidEmailField.setInvalid(true);

    add(validEmailField, invalidEmailField);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<EmailFieldBasic> { // hidden-source-line
  } // hidden-source-line
}
