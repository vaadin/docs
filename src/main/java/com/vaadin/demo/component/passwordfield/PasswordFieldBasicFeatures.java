package com.vaadin.demo.component.passwordfield;

import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("password-field-basic-features")
public class PasswordFieldBasicFeatures extends HorizontalLayout {

    public PasswordFieldBasicFeatures() {
        setPadding(false);

        // tag::snippet[]
        PasswordField field = new PasswordField();
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setPlaceholder("Placeholder");
        field.setTooltipText("Tooltip text");
        field.setClearButtonVisible(true);
        field.setPrefixComponent(VaadinIcon.LOCK.create());
        // end::snippet[]

        add(field);
    }

    public static class Exporter extends DemoExporter<PasswordFieldBasicFeatures> { // hidden-source-line
    } // hidden-source-line
}
