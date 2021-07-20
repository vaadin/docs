package com.vaadin.demo.component.formlayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.formlayout.FormLayout.ResponsiveStep;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

@Route("form-layout-custom-layout")
public class FormLayoutCustomLayout extends Div {

  public FormLayoutCustomLayout() {
    TextField firstName = new TextField("First name");
    TextField lastName = new TextField("Last name");
    EmailField email = new EmailField("Email");

    FormLayout formLayout = new FormLayout();
    formLayout.add(firstName, lastName, email);
    // tag::snippet[]
    formLayout.setResponsiveSteps(
            // Use one column by default
            new ResponsiveStep("0", 1),
            // Use two columns, if the layout's width exceeds 320px
            new ResponsiveStep("320px", 2),
            // Use three columns, if the layout's width exceeds 500px
            new ResponsiveStep("500px", 3)
    );
    // end::snippet[]

    SplitLayout splitLayout = new SplitLayout(formLayout, new Div());
    add(splitLayout);
  }
  public static class Exporter extends DemoExporter<FormLayoutCustomLayout> { // hidden-source-line
  } // hidden-source-line
}
