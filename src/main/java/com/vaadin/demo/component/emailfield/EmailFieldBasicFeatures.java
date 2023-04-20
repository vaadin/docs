package com.vaadin.demo.component.emailfield;

import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("email-field-basic-features")
public class EmailFieldBasicFeatures extends HorizontalLayout {

    public EmailFieldBasicFeatures() {
        setPadding(false);

        // tag::snippet[]
        EmailField field = new EmailField();
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setPlaceholder("Placeholder");
        field.setTooltipText("Tooltip text");
        field.setClearButtonVisible(true);
        field.setPrefixComponent(VaadinIcon.ENVELOPE.create());
        // end::snippet[]

        add(field);
    }

    public static class Exporter extends DemoExporter<EmailFieldBasicFeatures> { // hidden-source-line
    } // hidden-source-line
}
