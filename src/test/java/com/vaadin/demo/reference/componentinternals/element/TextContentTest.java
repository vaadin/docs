package com.vaadin.demo.reference.componentinternals.element;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import com.vaadin.flow.dom.Element;
import com.vaadin.flow.dom.ElementFactory;

public class TextContentTest {

    @Test
    public void demonstrate_setText() {
        // tag::settext[]
        // <div>Hello world</div>
        Element element = ElementFactory.createDiv("Hello world");
        assertEquals("<div>Hello world</div>", element.toString());

        // <div>
        // Hello world<span></span>
        // </div>
        element.appendChild(ElementFactory.createSpan());
        assertEquals("<div>\n Hello world<span></span>\n</div>",
                element.toString());

        // <div>Replacement text</div> (the span is removed)
        element.setText("Replacement text");
        assertEquals("<div>Replacement text</div>", element.toString());
        // end::settext[]
    }

    @Test
    public void demonstrate_getText_and_getTextRecursively() {
        // tag::gettext[]
        // <div>Welcome back </div>
        Element element = ElementFactory.createDiv("Welcome back ");

        Element name = ElementFactory.createStrong("Rudolph Reindeer");
        // <div>
        // Welcome back <strong>Rudolph Reindeer</strong>
        // </div>
        element.appendChild(name);

        assertEquals("Welcome back Rudolph Reindeer",
                element.getTextRecursively());
        assertEquals("Welcome back ", element.getText());
        // end::gettext[]
    }

}
