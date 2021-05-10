package com.vaadin.demo.component.inputfields;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("input-field-aria-label")
public class InputFieldAriaLabel extends Div {

  public InputFieldAriaLabel() {
    // tag::snippet[]
    TextField textField = new TextField();
    textField.getElement().setAttribute("aria-label", "search");
    textField.setPlaceholder("Search");
    textField.setClearButtonVisible(true);
    textField.setPrefixComponent(VaadinIcon.SEARCH.create());
    add(textField);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<InputFieldAriaLabel> { // hidden-source-line
  } // hidden-source-line
}
