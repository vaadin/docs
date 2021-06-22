package com.vaadin.demo.component.basiclayouts;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.html.Div;

@Tag("layout-item")
@JsModule("demo/component/basiclayouts/layout-item.ts")
public class LayoutItem extends Div {
    public LayoutItem(String label) {
        this(label, false);
    }

    public LayoutItem(String label, boolean isDisabled) {
        this.setText(label);
        if (isDisabled) {
            this.getElement().setAttribute("theme", "inactive");
        }
    }
}
