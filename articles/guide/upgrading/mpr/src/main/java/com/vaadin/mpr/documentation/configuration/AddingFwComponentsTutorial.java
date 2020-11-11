package com.vaadin.mpr.documentation.configuration;

import com.vaadin.flow.component.html.Div;
import com.vaadin.mpr.LegacyWrapper;
import com.vaadin.mpr.documentation.annotations.CodeFor;

@CodeFor("introduction/step-5-adding-legacy-components.asciidoc")
public class AddingFwComponentsTutorial extends Div {

    public void tutorial() {
        add(new com.vaadin.flow.component.html.NativeButton(
                "Flow button that adds a FW7 Label", e -> {
                    add(new LegacyWrapper(
                            new com.vaadin.ui.Label("Legacy label")));
                }));
        add(new LegacyWrapper(new com.vaadin.ui.NativeButton(
                "Legacy button that adds a Flow Label", e -> {
                    add(new com.vaadin.flow.component.html.Label("Flow label"));
                })));
    }

}
