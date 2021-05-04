package com.vaadin.demo.component.textfield;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-field-basic")
public class TextFieldBasic extends Div {

  public TextFieldBasic() {
    // tag::snippet[]
    TextField textField = new TextField();
    textField.setLabel("Street Address");
    textField.setValue("Ruukinkatu 2");
    textField.setClearButtonVisible(true);
    textField.setPrefixComponent(VaadinIcon.MAP_MARKER.create());
    add(textField);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TextFieldBasic> { // hidden-source-line
  } // hidden-source-line
}
