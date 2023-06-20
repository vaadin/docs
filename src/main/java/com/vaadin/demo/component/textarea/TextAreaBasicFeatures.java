package com.vaadin.demo.component.textarea;

import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-area-basic-features")
public class TextAreaBasicFeatures extends HorizontalLayout {

    public TextAreaBasicFeatures() {
        setPadding(false);

        // tag::snippet[]
        TextArea field = new TextArea();
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setPlaceholder("Placeholder");
        field.setTooltipText("Tooltip text");
        field.setClearButtonVisible(true);
        field.setPrefixComponent(VaadinIcon.VAADIN_H.create());
        field.setSuffixComponent(new Span(":)"));
        // end::snippet[]
        field.setWidthFull();
        add(field);
    }

    public static class Exporter extends DemoExporter<TextAreaBasicFeatures> { // hidden-source-line
    } // hidden-source-line
}
