package com.vaadin.demo.component.formlayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Input;
import com.vaadin.flow.router.Route;

@Route("form-layout-native-input")
public class FormLayoutNativeInput extends Div {

  public FormLayoutNativeInput() {
    FormLayout formLayout = new FormLayout();
    // tag::snippet[]
    formLayout.addFormItem(new Input(), "Revenue");
    // end::snippet[]
    add(formLayout);
  }
  public static class Exporter extends DemoExporter<FormLayoutNativeInput> { // hidden-source-line
  } // hidden-source-line
}
