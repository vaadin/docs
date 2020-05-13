package com.vaadin.flow.tutorial.databinding;

import com.vaadin.flow.component.AbstractSinglePropertyField;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("binding-data/tutorial-flow-field.asciidoc")
@Tag("paper-slider")
@NpmPackage(value = "@polymer/paper-slider",
        version = "3.0.1")
@JsModule("@polymer/paper-slider/paper-slider.js")
public class PaperSlider
        extends AbstractSinglePropertyField<PaperSlider,
            Integer> {
    public PaperSlider() {
        super("value", 0, false);
    }
}
