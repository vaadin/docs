package com.vaadin.demo.ce;

import java.util.Objects;

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
            setHelperText(context.getPropertyName(),
                    context.getUser().getName() + " is editing this field");
            return () -> setHelperText(context.getPropertyName(), null); // <4>
        });

        manager.setValue("name", "John"); // <5>

        manager.setPropertyChangeHandler(event -> // <6>
                setValue(event.getPropertyName(), event.getValue().toString()));
        // end::snippet[]
    }

    void setHelperText(String property, String text) {
        if (Objects.equals(property, "name")) {
            nameField.setHelperText(text);
        }
    }

    void setValue(String property, String value) {
        if (Objects.equals(property, "name")) {
            nameField.setValue(value);
        }
    }
}
