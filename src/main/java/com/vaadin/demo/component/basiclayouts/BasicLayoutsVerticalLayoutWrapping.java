package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/vertical-layout-wrapping")
public class BasicLayoutsVerticalLayoutWrapping extends Div {

    public BasicLayoutsVerticalLayoutWrapping() {
        HorizontalLayout parent = new HorizontalLayout();
        parent.setSpacing(true);
        parent.setMargin(true);
        parent.getElement().getStyle().setBorder("0");

        VerticalLayout layoutNoWrap = new VerticalLayout();
        layoutNoWrap.setPadding(true);
        layoutNoWrap.setSpacing(true);
        layoutNoWrap.setAlignItems(FlexComponent.Alignment.STRETCH);
        layoutNoWrap.setHeight("200px");
        layoutNoWrap.setWidthFull();
        layoutNoWrap.add(new Button("Button 1"));
        layoutNoWrap.add(new Button("Button 2"));
        layoutNoWrap.add(new Button("Button 3"));
        layoutNoWrap.add(new Button("Button 4"));
        parent.add(layoutNoWrap);

        // tag::snippet[]
        VerticalLayout layout = new VerticalLayout();
        layout.setWrap(true);
        // end::snippet[]
        layout.setPadding(true);
        layout.setSpacing(true);
        layout.setAlignItems(FlexComponent.Alignment.STRETCH);
        layout.setHeight("200px");
        layout.setWidthFull();
        layout.add(new Button("Button 1"));
        layout.add(new Button("Button 2"));
        layout.add(new Button("Button 3"));
        layout.add(new Button("Button 4"));

        parent.add(layout);
        this.setClassName("basic-layouts-example");
        this.add(parent);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BasicLayoutsVerticalLayoutWrapping> { // hidden-source-line
    } // hidden-source-line
}
