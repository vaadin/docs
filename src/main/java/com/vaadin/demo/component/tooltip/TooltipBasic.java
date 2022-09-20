package com.vaadin.demo.component.tooltip;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("tooltip-basic")
public class TooltipBasic extends Div {

  public TooltipBasic() {
    // tag::snippet[]
    TextField textField = new TextField();
    textField.setPlaceholder("Search");
    textField.setPrefixComponent(new Icon("lumo", "search"));
    // textField.setTooltip("Wrap in “quotes” for exact phrase");
    add(textField);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TooltipBasic> { // hidden-source-line
  } // hidden-source-line
}
