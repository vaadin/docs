package com.vaadin.demo.component.textfield;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("text-field-basic")
public class TextFieldBasic extends Div {

  public TextFieldBasic() {
    // tag::snippet[]
    TextField textfield = new TextField();
    textfield.setLabel("Street Address");
    textfield.setValue("Ruukinkatu 2");
    textfield.setClearButtonVisible(true);
    textfield.setPrefixComponent(VaadinIcon.MAP_MARKER.create());
    add(textfield);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TextFieldBasic> { // hidden-full-source-line
  } // hidden-full-source-line
}
