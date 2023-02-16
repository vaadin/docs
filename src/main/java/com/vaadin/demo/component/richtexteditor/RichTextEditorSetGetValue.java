package com.vaadin.demo.component.richtexteditor;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.richtexteditor.RichTextEditor;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

import java.util.Objects;

@Route("rich-text-editor-set-get-value")
public class RichTextEditorSetGetValue extends Div {

    public RichTextEditorSetGetValue() {
        // tag::snippet[]
        RichTextEditor rte = new RichTextEditor();
        rte.getStyle().set("max-height", "400px");
        rte.setValueChangeMode(ValueChangeMode.TIMEOUT);

        // HTML value
        TextArea htmlTextArea = new TextArea("HTML Value");
        htmlTextArea.setHelperText("Shows the HTML representation of the edited document. You can also modify or paste HTML here to see the changes reflected in the editor above. Note that you have to leave (blur) this field in order for the editor to update.");
        htmlTextArea.setWidthFull();
        rte.asHtml().addValueChangeListener(e -> htmlTextArea.setValue(e.getValue() == null ? "" : e.getValue()));
        htmlTextArea.addValueChangeListener(e -> {
            if (!Objects.equals(rte.asHtml().getValue(), e.getValue())) {
                rte.asHtml().setValue(e.getValue());
            }
        });

        // Delta value
        TextArea deltaTextArea = new TextArea("Delta Value");
        deltaTextArea.setHelperText("Shows the Delta representation of the edited document. You can also modify or paste the Delta JSON here to see the changes reflected in the editor above. Note that you have to leave (blur) this field in order for the editor to update.");
        deltaTextArea.setWidthFull();
        rte.asDelta().addValueChangeListener(e -> deltaTextArea.setValue(e.getValue()));
        deltaTextArea.addValueChangeListener(e -> {
            if (!rte.asDelta().getValue().equals(e.getValue())) {
                rte.asDelta().setValue(e.getValue());
            }
        });

        add(rte, htmlTextArea, deltaTextArea);
        // end::snippet[]
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<RichTextEditorSetGetValue> { // hidden-source-line
    } // hidden-source-line
}
