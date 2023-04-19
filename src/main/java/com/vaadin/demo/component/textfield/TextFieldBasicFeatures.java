package com.vaadin.demo.component.textfield;

import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-field-basic-features")
public class TextFieldBasicFeatures extends HorizontalLayout {

    public TextFieldBasicFeatures() {
        setPadding(false);

        // tag::snippet[]
        TextField field = new TextField();
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setPlaceholder("Placeholder");
        field.setTooltipText("Tooltip text");
        field.setClearButtonVisible(true);
        field.setPrefixComponent(VaadinIcon.VAADIN_H.create());
        field.setSuffixComponent(new Span(":)"));
        // end::snippet[]

        add(field);
    }

    public static class Exporter extends DemoExporter<TextFieldBasicFeatures> { // hidden-source-line
    } // hidden-source-line
}
