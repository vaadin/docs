package com.vaadin.demo.reference.componentinternals.basics;

import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Input;
import com.vaadin.flow.component.html.NativeLabel;

public class CompositeTextField extends Composite<Div> {

    private final NativeLabel label;
    private final Input input;

    public CompositeTextField(String labelText, String value) {
        label = new NativeLabel();
        label.setText(labelText);
        input = new Input();
        input.setValue(value);

        // Users of CompositeTextField can't access the div directly since
        // getContent() is protected.
        var div = getContent();
        div.add(label, input);
    }

    // Declare public API here.
}
