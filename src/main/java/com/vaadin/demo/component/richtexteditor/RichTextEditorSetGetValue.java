package com.vaadin.demo.component.richtexteditor;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.richtexteditor.RichTextEditor;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("rich-text-editor-set-get-value")
public class RichTextEditorSetGetValue extends Div {

  public RichTextEditorSetGetValue() {
    // tag::snippet[]
    TextArea textArea = new TextArea("Html Value", "Type html string here to set it as value to the Rich Text Editor above...");
    textArea.setWidthFull();

    RichTextEditor rte = new RichTextEditor();
    rte.getStyle().set("max-height", "400px");

    rte.asHtml().addValueChangeListener(e -> textArea.setValue(e.getValue()));
    textArea.addValueChangeListener(e -> {
      if (!rte.asHtml().getValue().equals(e.getValue())) {
        rte.asHtml().setValue(e.getValue());
      }
    });
    add(rte, textArea);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<RichTextEditorSetGetValue> { // hidden-source-line
  } // hidden-source-line
}
