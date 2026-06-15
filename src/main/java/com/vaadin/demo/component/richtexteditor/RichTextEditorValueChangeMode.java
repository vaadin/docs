package com.vaadin.demo.component.richtexteditor;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.richtexteditor.RichTextEditor;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;

import static com.vaadin.demo.component.Constants.valueChangeModes;

@Route("rich-text-editor-value-change-mode")
public class RichTextEditorValueChangeMode extends VerticalLayout {

    public RichTextEditorValueChangeMode() {
        setPadding(false);

        // tag::snippet[]
        var rte = new RichTextEditor();
        rte.setMaxHeight("300px");
        var modeSelector = new Select<>("Value Change Mode", valueChangeModes);
        modeSelector.setValue(rte.getValueChangeMode());
        modeSelector.addValueChangeListener(e -> {
            rte.setValue("");
            rte.setValueChangeMode(e.getValue());
        });
        var serverSideContent = new Span();
        rte.addValueChangeListener(
                e -> serverSideContent.setText(e.getValue()));
        // end::snippet[]

        modeSelector.setItemLabelGenerator(ValueChangeMode::name);

        var serverSideLayout = new HorizontalLayout(new Span("Server side:"),
                serverSideContent);

        add(rte, modeSelector, serverSideLayout);
    }

    public static class Exporter
            extends DemoExporter<RichTextEditorValueChangeMode> { // hidden-source-line
    } // hidden-source-line
}
