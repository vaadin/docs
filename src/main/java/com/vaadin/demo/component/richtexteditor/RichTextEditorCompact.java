package com.vaadin.demo.component.richtexteditor;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.richtexteditor.RichTextEditor;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.demo.domain.DataService;

@Route("rich-text-editor-compact")
public class RichTextEditorCompact extends Div {

    public RichTextEditorCompact() {
        // tag::snippet[]
        RichTextEditor rte = new RichTextEditor();
        rte.getStyle().set("max-height", "400px");
        String valueAsDelta = DataService.getTemplates().getRichTextDelta();
        rte.setValue(valueAsDelta);
        add(rte);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<RichTextEditorCompact> { // hidden-full-source-line
    } // hidden-full-source-line
}
