package com.vaadin.demo.component.richtexteditor;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.richtexteditor.RichTextEditor;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("rich-text-editor-readonly")
public class RichTextEditorReadonly extends Div {

  public RichTextEditorReadonly() {
    // tag::snippet[]
    RichTextEditor rte = new RichTextEditor();
    rte.setMaxHeight("400px");
    String valueAsDelta = DataService.getTemplates().getRichTextDelta();
    rte.setValue(valueAsDelta);
    rte.setReadOnly(true);
    add(rte);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<RichTextEditorReadonly> { // hidden-source-line
  } // hidden-source-line
}
