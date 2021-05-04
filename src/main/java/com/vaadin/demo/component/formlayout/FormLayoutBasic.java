package com.vaadin.demo.component.formlayout;

import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("form-layout-basic")
public class FormLayoutBasic extends Div {

  public FormLayoutBasic() {
    // tag::snippet[]
    TextField firstNameField = new TextField("First Name");
    TextField lastNameField = new TextField("Last Name");
    TextField cityField = new TextField("City");
    EmailField emailField = new EmailField("Email");
    TextArea bioField = new TextArea("Bio");

    FormLayout formLayout = new FormLayout();
    formLayout.add(firstNameField, lastNameField, cityField, emailField, bioField);
    formLayout.setColspan(bioField, 2);

    add(formLayout);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<FormLayoutBasic> { // hidden-source-line
  } // hidden-source-line
}
