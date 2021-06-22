package com.vaadin.demo.component.basiclayouts;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.html.Div;

@Tag("layout-item")
public class LayoutItem extends Div {
    public LayoutItem(String label) {
        this(label, false);
    }

    public LayoutItem(String label, boolean isDisabled) {
        this.setText(label);
        getStyle().set("display", "flex").set("align-items", "center")
                .set("justify-content", "center")
                .set("padding", "var(--lumo-space-wide-xs)").set("background",
                isDisabled ?
                        "var(--lumo-contrast-80pct)" :
                        "var(--lumo-primary-color)")
                .set("border-radius", "var(--lumo-border-radius-m)")
                .set("color", "var(--lumo-base-color)");
    }
}
