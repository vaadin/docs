package com.vaadin.demo.ce;

import com.vaadin.collaborationengine.FormManager;
import com.vaadin.collaborationengine.UserInfo;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;

/**
 * Code snippets used in FormManager's reference documentation.
 */

public class FormManagerExample {
    private final TextField nameField;

    public FormManagerExample() {
        // tag::snippet[]
        VerticalLayout form = new VerticalLayout();

        nameField = new TextField();
        nameField.setLabel("Name");
        form.add(nameField);

        UserInfo localUser = new UserInfo("john");

        FormManager manager = new FormManager(form, localUser, "my-topic"); // <1>

        manager.highlight("name", true); // <2>

        manager.setHighlightHandler(context -> { // <3>
            String propertyName = context.getPropertyName();
            UserInfo user = context.getUser();

            // Executed when a field is highlighted

            return () -> { // <4>
                // Executed when a field is no longer highlighted
            };
        });

        manager.setValue("name", "John"); // <5>

        manager.setPropertyChangeHandler(event -> { // <6>
            String propertyName = event.getPropertyName();
            Object value = event.getValue();

            // Executed when a property value is changed
        });
        // end::snippet[]
    }
}
