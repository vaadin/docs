package com.vaadin.demo.component.bigdecimalfield;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.BigDecimalField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("big-decimal-field-basic")
public class BigDecimalFieldBasic extends Div {

  public BigDecimalFieldBasic() {
    // tag::snippet[]
    BigDecimalField bdf = new BigDecimalField("Big decimal");
    add(bdf);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<BigDecimalFieldBasic> { // hidden-full-source-line
  } // hidden-full-source-line
}
