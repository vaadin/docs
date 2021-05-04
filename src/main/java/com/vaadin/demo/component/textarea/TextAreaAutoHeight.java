package com.vaadin.demo.component.textarea;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("text-area-auto-height")
public class TextAreaAutoHeight extends Div {

  public TextAreaAutoHeight() {
    String loremIpsum = DataService.getTemplates().getLoremIpsum();

    // tag::snippet[]
    TextArea textArea = new TextArea();
    textArea.setWidthFull();
    textArea.setLabel("Description");
    textArea.setValue(loremIpsum);
    add(textArea);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TextAreaAutoHeight> { // hidden-source-line
  } // hidden-source-line
}
