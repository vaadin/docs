package com.vaadin.demo.component.bigdecimalfield;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.BigDecimalField;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

public class BasicBigDecimalField extends Div {

  public BasicBigDecimalField() {
    // tag::snippet[]
    BigDecimalField bdf = new BigDecimalField("Big decimal");
    add(bdf);
    // end::snippet[]
  }

  public static class GridEditorExporter extends DemoExporter<BasicBigDecimalField> { // hidden-full-source-line
  } // hidden-full-source-line
}
