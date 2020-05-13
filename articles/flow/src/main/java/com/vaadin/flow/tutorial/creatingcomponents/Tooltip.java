package com.vaadin.flow.tutorial.creatingcomponents;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasComponents;
import com.vaadin.flow.component.HasStyle;
import com.vaadin.flow.component.html.H5;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("creating-components/tutorial-component-mixins.asciidoc")
public class Tooltip extends Component
        implements HasComponents, HasStyle {


    private void tooltipExample() {
        Tooltip tooltip = new Tooltip();

        tooltip.add(new H5("Tooltip"));
        tooltip.add(new Paragraph("I am a paragraph"));
    }
}