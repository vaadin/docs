package com.vaadin.flow.tutorial.webcomponent;

import com.vaadin.flow.component.AbstractSinglePropertyField;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.PropertyDescriptor;
import com.vaadin.flow.component.PropertyDescriptors;
import com.vaadin.flow.component.Synchronize;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.shared.Registration;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("web-components/integrating-a-web-component.asciidoc")
@Tag("paper-slider")
@NpmPackage(value = "@polymer/paper-slider",
        version = "3.0.1")
@JsModule("@polymer/paper-slider/paper-slider.js")
@JsModule("./my-local-module.js")
public class PaperSlider
        extends AbstractSinglePropertyField<PaperSlider, Integer> {

    private static final PropertyDescriptor<Boolean, Boolean> pinProperty = PropertyDescriptors
            .propertyWithDefault("pin", false);
    private static final PropertyDescriptor<Integer, Integer> valueProperty = PropertyDescriptors
            .propertyWithDefault("value", 0);

    public PaperSlider() {
        super("", 0, false);
    }

    public void setPin(boolean pin) {
        pinProperty.set(this, pin);
    }

    public boolean isPin() {
        return pinProperty.get(this);
    }

    public void increment() {
        getElement().callJsFunction("increment");
    }

    @Override
    public void setValue(Integer value) {
        valueProperty.set(this, value);
    }

    @Override
    @Synchronize("value-changed")
    public Integer getValue() {
        return valueProperty.get(this);
    }

    public Registration addClickListener(
            ComponentEventListener<ClickEvent> listener) {
        return addListener(ClickEvent.class, listener);
    }

}
