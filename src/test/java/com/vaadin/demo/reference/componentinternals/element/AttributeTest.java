package com.vaadin.demo.reference.componentinternals.element;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Test;

import com.vaadin.flow.dom.Element;
import com.vaadin.flow.dom.ElementFactory;

public class AttributeTest {

    @Test
    public void demonstrate_working_with_attributes() {
        // tag::set[]
        Element nameField = ElementFactory.createInput();
        nameField.setAttribute("id", "nameField");
        nameField.setAttribute("placeholder", "John Doe");
        nameField.setAttribute("autofocus", "");
        // end::set[]

        // tag::getchange[]
        // Retrieve values of "placeholder" and "autofocus"
        assertEquals("John Doe", nameField.getAttribute("placeholder"));
        assertTrue(nameField.hasAttribute("autofocus"));

        // Remove the "autofocus" attribute
        assertEquals(List.of("autofocus", "id", "placeholder"),
                nameField.getAttributeNames().toList());

        nameField.removeAttribute("autofocus");

        assertEquals(List.of("id", "placeholder"),
                nameField.getAttributeNames().toList());
        // end::getchange[]
    }
}
