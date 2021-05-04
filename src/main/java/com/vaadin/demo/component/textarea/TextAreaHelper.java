package com.vaadin.demo.component.textarea;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("text-area-helper")
public class TextAreaHelper extends Div {

  public TextAreaHelper() {
    String loremIpsum = DataService.getTemplates().getLoremIpsum();
    int charLimit = 600;

    // tag::snippet[]
    TextArea textArea = new TextArea();
    textArea.setWidthFull();
    textArea.setLabel("Description");
    textArea.setMaxLength(charLimit);
    textArea.setValueChangeMode(ValueChangeMode.EAGER);
    textArea.addValueChangeListener(e -> {
      e.getSource().setHelperText(e.getValue().length() + "/" + charLimit);
    });
    textArea.setValue(loremIpsum);
    add(textArea);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TextAreaHelper> { // hidden-source-line
  } // hidden-source-line
}
