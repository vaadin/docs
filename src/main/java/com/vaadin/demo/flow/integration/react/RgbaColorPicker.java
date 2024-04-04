package com.vaadin.demo.flow.integration.react;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.react.ReactAdapterComponent;
import com.vaadin.flow.function.SerializableConsumer;

// tag::annotations[]
@NpmPackage(value = "react-colorful", version = "5.6.1") // <1>
@JsModule("./demo/flow/integration/react/rgba-color-picker.tsx") // <2>
@Tag("rgba-color-picker") // <3>
// tag::accessors[]
// tag::event[]
// tag::constructor[]
public class RgbaColorPicker extends ReactAdapterComponent {

    // end::annotations[]
    // end::accessors[]
    // end::event[]
    public RgbaColorPicker() {
        setColor(new RgbaColor(255, 0, 0, 0.5));
    }
    // end::constructor[]

    // tag::accessors[]
    public RgbaColor getColor() {
        return getState("color", RgbaColor.class);
    }

    public void setColor(RgbaColor color) {
        setState("color", color);
    }
    // end::accessors[]

    // tag::event[]
    public void addColorChangeListener(SerializableConsumer<RgbaColor> listener) {
        addStateChangeListener("color", RgbaColor.class, listener);
    }
    // tag::annotations[]
    // tag::accessors[]
    // tag::constructor[]

}
// end::annotations[]
// end::accessors[]
// end::constructor[]
// end::event[]
