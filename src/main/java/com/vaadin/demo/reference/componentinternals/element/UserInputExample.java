package com.vaadin.demo.reference.componentinternals.element;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.dom.Element;
import com.vaadin.flow.dom.ElementFactory;

@Tag("div")
public class UserInputExample extends Component {

    public UserInputExample() {
        // tag::create[]
        Element textInput = ElementFactory.createInput();
        textInput.setAttribute("placeholder", "Enter your name");
        // end::create[]
        // tag::listen[]
        textInput.addPropertyChangeListener("value", "change", e -> {
        });
        // end::listen[]

        // tag::process[]
        Element button = ElementFactory.createButton("Say Hello");
        button.addEventListener("click", e -> {
            String responseText = "Hello " + textInput.getProperty("value"); // <1>
            Element response = ElementFactory.createDiv(responseText);
            getElement().appendChild(response);
        });
        // end::process[]

        getElement().appendChild(textInput, button);
    }
}
