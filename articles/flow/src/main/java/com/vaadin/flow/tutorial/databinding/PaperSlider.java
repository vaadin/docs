package com.vaadin.flow.tutorial.databinding;

import com.vaadin.flow.component.AbstractSinglePropertyField;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.HtmlImport;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("binding-data/tutorial-flow-field.asciidoc")
@Tag("paper-slider")
@HtmlImport("bower_components/paper-slider/paper-slider.html")
public class PaperSlider
        extends AbstractSinglePropertyField<PaperSlider, Integer> {
    public PaperSlider() {
        super("value", 0, false);
    }
}
