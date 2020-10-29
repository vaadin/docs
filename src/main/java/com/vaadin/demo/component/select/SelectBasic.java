package com.vaadin.demo.component.select;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("select-basic")
public class SelectBasic extends Div {

  public SelectBasic() {
    // tag::snippet[]
    Select<String> select = new Select<>();
    select.setLabel("Membership");
    select.setItems("Regular", "Premium", "VIP");

    add(select);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<SelectBasic> { // hidden-full-source-line
  } // hidden-full-source-line
}
