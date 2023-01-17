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
        RichTextEditor rte = new RichTextEditor();
        rte.getStyle().set("max-height", "400px");

        // HTML value
        TextArea htmlTextArea = new TextArea("HTML Value",
                "Enter something in the Rich Text Editor to see its HTML value here.");
        htmlTextArea.setWidthFull();
        rte.addValueChangeListener(e -> htmlTextArea.setValue(e.getValue()));
        htmlTextArea.addValueChangeListener(e -> {
            if (!rte.getValue().equals(e.getValue())) {
                rte.setValue(e.getValue());
            }
        });

        // Delta value
        TextArea deltaTextArea = new TextArea("Delta Value",
                "Enter something in the Rich Text Editor to see its Delta value here.");
        deltaTextArea.setWidthFull();
        rte.asDelta().addValueChangeListener(e -> deltaTextArea.setValue(e.getValue()));
        deltaTextArea.addValueChangeListener(e -> {
            if (!rte.asDelta().getValue().equals(e.getValue())) {
                rte.asDelta().setValue(e.getValue());
            }
        });

        add(rte, htmlTextArea);
        // end::snippet[]
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<RichTextEditorSetGetValue> { // hidden-source-line
    } // hidden-source-line
}
