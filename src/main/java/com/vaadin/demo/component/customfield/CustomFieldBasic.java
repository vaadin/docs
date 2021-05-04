package com.vaadin.demo.component.customfield;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("custom-field-basic")
public class CustomFieldBasic extends Div {

  public CustomFieldBasic() {
    // tag::snippet[]

    // end::snippet[]
  }
  public static class Exporter extends DemoExporter<CustomFieldBasic> {} // hidden-full-source-line
}
