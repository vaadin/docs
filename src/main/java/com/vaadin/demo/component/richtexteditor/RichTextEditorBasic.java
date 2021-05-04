package com.vaadin.demo.component.richtexteditor;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.richtexteditor.RichTextEditor;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("rich-text-editor-basic")
public class RichTextEditorBasic extends Div {

  public RichTextEditorBasic() {
    // tag::snippet[]
    RichTextEditor rte = new RichTextEditor();
    rte.getStyle().set("max-height", "400px");
    String valueAsDelta = DataService.getTemplates().getRichTextDelta();
    rte.setValue(valueAsDelta);
    add(rte);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<RichTextEditorBasic> { // hidden-source-line
  } // hidden-source-line
}
