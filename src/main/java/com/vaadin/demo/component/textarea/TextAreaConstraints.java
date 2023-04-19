package com.vaadin.demo.component.textarea;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-area-constraints")
public class TextAreaConstraints extends HorizontalLayout {

    public TextAreaConstraints() {
        setPadding(false);

        // tag::snippet[]
        TextArea field = new TextArea("Sentence");
        field.setRequiredIndicatorVisible(true);
        field.setPattern("^[A-Z]([A-Za-z0-9,\\-\\s])*\\.$");
        field.setAllowedCharPattern("[A-Za-z0-9,.\\-\\s]");
        field.setMinLength(5);
        field.setMaxLength(50);
        // end::snippet[]
        field.setHelperText("Must be one complete sentence ending in a period, between 5 and 50 characters long");
        field.setWidthFull();
        add(field);
    }

    public static class Exporter extends DemoExporter<TextAreaConstraints> { // hidden-source-line
    } // hidden-source-line
}
