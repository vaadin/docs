package com.vaadin.demo.component.textfield;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-field-placeholder")
public class TextFieldPlaceholder extends Div {

  public TextFieldPlaceholder() {
    // tag::snippet[]
    TextField textField = new TextField();
    textField.setPlaceholder("Search");
    textField.setPrefixComponent(VaadinIcon.SEARCH.create());
    add(textField);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TextFieldPlaceholder> { // hidden-source-line
  } // hidden-source-line
}
