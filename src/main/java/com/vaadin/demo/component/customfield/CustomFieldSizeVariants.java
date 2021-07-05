package com.vaadin.demo.component.customfield;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("custom-field-size-variants")
public class CustomFieldSizeVariants extends Div {

  public CustomFieldSizeVariants() {
    // tag::snippet[]
    MoneyField moneyField = new MoneyField("Price");
    moneyField.addThemeVariant("small");
    // end::snippet[]
    add(moneyField);
  }
  public static class Exporter extends DemoExporter<CustomFieldSizeVariants> {} // hidden-source-line
}
