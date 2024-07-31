package com.vaadin.demo.component.checkbox;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.domain.UserPermissions;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("checkbox-required")
public class CheckboxRequired extends HorizontalLayout {

    public CheckboxRequired() {
        // tag::snippet[]
        Checkbox checkbox = new Checkbox();
        checkbox.setLabel("Grant view permissions");
        checkbox.setRequiredIndicatorVisible(true);

        Binder<UserPermissions> binder = new Binder<>(UserPermissions.class);
        binder.forField(checkbox).asRequired("This field is required")
                .bind(UserPermissions::getView, UserPermissions::setView);
        // end::snippet[]

        Button button = new Button("Submit", e -> {
            binder.validate();
        });

        setAlignItems(FlexComponent.Alignment.BASELINE);
        add(checkbox, button);
    }

    public static class Exporter extends DemoExporter<CheckboxRequired> { // hidden-source-line
    } // hidden-source-line
}
