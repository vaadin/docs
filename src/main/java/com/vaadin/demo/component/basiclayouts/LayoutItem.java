package com.vaadin.demo.component.basiclayouts;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;

@Tag("layout-item")
@JsModule("demo/component/basiclayouts/layout-item.ts")
public class LayoutItem extends Component {
    public LayoutItem(String label) {
        this(label, false);
    }

    public LayoutItem(String label, boolean isDisabled) {
        this.getElement().setText(label);
        if (isDisabled) {
            this.getElement().setAttribute("theme", "inactive");
        }
    }
}
