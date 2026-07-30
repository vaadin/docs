package com.vaadin.demo.component.switchcomponent;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.checkbox.Switch;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.domain.UserPermissions;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("switch-validation")
public class SwitchValidation extends HorizontalLayout {

    public SwitchValidation() {
        // tag::snippet[]
        Switch confirmation = new Switch("I confirm the details are correct");
        confirmation.setRequiredIndicatorVisible(true);

        Binder<UserPermissions> binder = new Binder<>(UserPermissions.class);
        binder.forField(confirmation).asRequired("You must confirm to continue")
                .bind(UserPermissions::getView, UserPermissions::setView);
        // end::snippet[]

        Button button = new Button("Submit", e -> {
            binder.validate();
        });

        setAlignItems(FlexComponent.Alignment.BASELINE);
        add(confirmation, button);
    }

    public static class Exporter extends DemoExporter<SwitchValidation> { // hidden-source-line
    } // hidden-source-line
}
