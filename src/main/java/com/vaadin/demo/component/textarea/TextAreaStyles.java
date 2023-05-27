package com.vaadin.demo.component.textarea;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextAreaVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-area-styles")
public class TextAreaStyles extends HorizontalLayout {

    public TextAreaStyles() {
        setPadding(false);

        // tag::snippet[]
        TextArea field = new TextArea();
        field.addThemeVariants(
            TextAreaVariant.LUMO_SMALL,
            TextAreaVariant.LUMO_ALIGN_RIGHT,
            TextAreaVariant.LUMO_HELPER_ABOVE_FIELD
        );
        field.getStyle().set("--vaadin-input-field-border-width", "1px");
        // end::snippet[]
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setValue("Value");
        field.setWidthFull();

        add(field);
    }

    public static class Exporter extends DemoExporter<TextAreaStyles> { // hidden-source-line
    } // hidden-source-line
}
