package com.vaadin.demo.reference.componentinternals.basics;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.dom.Element;

@Tag("div")
public class LabeledTextField extends Component {

    private final Element labelElement = new Element("label");
    private final Element inputElement = new Element("input");

    public LabeledTextField() {
        getElement().appendChild(labelElement, inputElement);
    }
}
