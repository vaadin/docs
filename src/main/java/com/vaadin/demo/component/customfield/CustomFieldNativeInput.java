package com.vaadin.demo.component.customfield;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("custom-field-native-input")
public class CustomFieldNativeInput extends Div {

  public CustomFieldNativeInput() {
    // tag::snippet[]

    // end::snippet[]
  }
  public static class Exporter extends DemoExporter<CustomFieldNativeInput> {} // hidden-full-source-line
}
