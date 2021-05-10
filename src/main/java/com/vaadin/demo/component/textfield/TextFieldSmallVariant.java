package com.vaadin.demo.component.textfield;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-field-small-variant")
public class TextFieldSmallVariant extends HorizontalLayout {

  public TextFieldSmallVariant() {
    setPadding(false);

    // tag::snippet[]
    TextField defaultSize = new TextField();
    defaultSize.setLabel("Default size");
    defaultSize.setValue("Value");
    add(defaultSize);

    TextField smallSize = new TextField();
    smallSize.addThemeVariants(TextFieldVariant.LUMO_SMALL);
    smallSize.setLabel("Small size");
    smallSize.setValue("Value");
    add(smallSize);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TextFieldSmallVariant> { // hidden-source-line
  } // hidden-source-line
}
