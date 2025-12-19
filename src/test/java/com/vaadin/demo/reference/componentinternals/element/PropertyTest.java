package com.vaadin.demo.reference.componentinternals.element;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotSame;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import com.vaadin.flow.dom.Element;
import com.vaadin.flow.dom.ElementFactory;
import com.vaadin.flow.internal.JacksonUtils;

import tools.jackson.databind.node.ArrayNode;
import tools.jackson.databind.node.ObjectNode;

public class PropertyTest {

    @Test
    public void demonstrate_setProperty_and_getProperty() {
        // tag::setdouble[]
        Element input = ElementFactory.createInput();
        input.setProperty("value", 42.2);
        // end::setdouble[]
        // tag::convert[]
        // The "value" property is 42.2
        assertEquals("42.2", input.getProperty("value"));

        // true, since any non-empty string is true in JavaScript
        assertTrue(input.getProperty("value", true));

        // 42, string is parsed to a JS number and truncated to an int
        assertEquals(42, input.getProperty("value", 0));
        // end::convert[]
    }

    @Test
    public void demonstrate_setPropertyJson() {
        Element element = ElementFactory.createDiv();

        // tag::setjson[]
        ObjectNode options = JacksonUtils.createObjectNode();
        options.put("pageSize", 20);
        options.put("sortable", true);
        element.setPropertyJson("options", options);
        // end::setjson[]
        assertEquals(options.toString(), element.getProperty("options"));

        // tag::setarray[]
        ArrayNode items = JacksonUtils.createArrayNode();
        items.add("Option 1");
        items.add("Option 2");
        items.add("Option 3");
        element.setPropertyJson("items", items);        
        // end::setarray[]
        assertEquals(items.toString(), element.getProperty("items"));
    }

    @Test
    public void demonstrate_setPropertyBean() {
        Element element = ElementFactory.createDiv();

        // tag::setbean[]
        MyConfig config = new MyConfig("default", 100);
        element.setPropertyBean("config", config);
        // end::setbean[]
        assertEquals(config, element.getPropertyBean("config", MyConfig.class));
        assertNotSame(config, element.getPropertyBean("config", MyConfig.class));
    }

    record MyConfig(String myBean, int myInt) {
    }
}
