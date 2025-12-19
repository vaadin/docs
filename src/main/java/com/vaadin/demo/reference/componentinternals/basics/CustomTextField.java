package com.vaadin.demo.reference.componentinternals.basics;

import com.vaadin.flow.dom.Element;

public class CustomTextField extends LabeledTextField {

    private final Element errorElement = new Element("span");
    
    public CustomTextField() {
        super();
        getElement().appendChild(errorElement);
    }
}