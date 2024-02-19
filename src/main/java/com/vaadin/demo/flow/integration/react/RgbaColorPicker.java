package com.vaadin.demo.flow.integration.react;

import java.util.function.Consumer;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.react.ReactAdapterComponent;

@NpmPackage(value = "react-colorful", version = "5.6.1") // <1>
@JsModule("./demo/flow/integration/react/rgba-color-picker.tsx") // <2>
@Tag("rgba-color-picker") // <3>
public class RgbaColorPicker extends ReactAdapterComponent {

    public RgbaColorPicker() {

        setColor(new RgbaColor(255, 0, 0, 0.5));
    }

    public RgbaColor getColor() {
        return getState("color", RgbaColor.class);
    }

    public void setColor(RgbaColor color) {
        setState("color", color);
    }

    public void addColorChangeListener(Consumer<RgbaColor> listener) {
        addStateChangeListener("color", RgbaColor.class, listener);
    }
}
