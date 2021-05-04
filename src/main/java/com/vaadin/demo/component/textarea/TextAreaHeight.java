package com.vaadin.demo.component.textarea;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("text-area-height")
public class TextAreaHeight extends Div {

  public TextAreaHeight() {
    String loremIpsum = DataService.getTemplates().getLoremIpsum();

    // tag::snippet[]
    TextArea textArea = new TextArea();
    textArea.setWidthFull();
    textArea.setMinHeight("100px");
    textArea.setMaxHeight("150px");
    textArea.setLabel("Description");
    textArea.setValue(loremIpsum);
    add(textArea);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TextAreaHeight> { // hidden-source-line
  } // hidden-source-line
}
