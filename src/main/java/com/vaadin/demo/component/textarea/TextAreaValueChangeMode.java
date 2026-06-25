package com.vaadin.demo.component.textarea;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;

import static com.vaadin.demo.component.Constants.valueChangeModes;

@Route("text-area-value-change-mode")
public class TextAreaValueChangeMode extends VerticalLayout {

    public TextAreaValueChangeMode() {
        setPadding(false);

        // tag::snippet[]
        var textArea = new TextArea("Text Area");
        var modeSelector = new Select<>("Value Change Mode", valueChangeModes);
        modeSelector.setValue(textArea.getValueChangeMode());
        modeSelector.addValueChangeListener(e -> {
            textArea.clear();
            textArea.setValueChangeMode(e.getValue());
        });
        var serverSideContent = new Span();
        textArea.addValueChangeListener(
                e -> serverSideContent.setText(e.getValue()));
        // end::snippet[]

        modeSelector.setItemLabelGenerator(ValueChangeMode::name);

        var horizontalLayout = new HorizontalLayout(textArea, modeSelector);
        horizontalLayout.setAlignItems(Alignment.BASELINE);

        var serverSideLayout = new HorizontalLayout(new Span("Server side:"),
                serverSideContent);

        add(horizontalLayout, serverSideLayout);
    }

    public static class Exporter extends DemoExporter<TextAreaValueChangeMode> { // hidden-source-line
    } // hidden-source-line
}
