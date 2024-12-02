package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/horizontal-layout-wrapping")
public class BasicLayoutsHorizontalLayoutWrapping extends Div {

    public BasicLayoutsHorizontalLayoutWrapping() {
        HorizontalLayout layoutNoWrap = new HorizontalLayout();
        layoutNoWrap.setPadding(true);
        layoutNoWrap.setSpacing(true);
        layoutNoWrap.setMargin(true);
        layoutNoWrap.setAlignItems(FlexComponent.Alignment.STRETCH);
        layoutNoWrap.setWidth("350px");
        layoutNoWrap.add(new Button("Button 1"));
        layoutNoWrap.add(new Button("Button 2"));
        layoutNoWrap.add(new Button("Button 3"));
        layoutNoWrap.add(new Button("Button 4"));
        layoutNoWrap.add(new Button("Button 5"));
        this.add(layoutNoWrap);

        // tag::snippet[]
        HorizontalLayout layout = new HorizontalLayout();
        layout.setPadding(true);
        layout.setSpacing(true);
        layout.setMargin(true);
        layout.setWrap(true);
        layout.setAlignItems(FlexComponent.Alignment.STRETCH);
        layout.setWidth("350px");
        layout.add(new Button("Button 1"));
        layout.add(new Button("Button 2"));
        layout.add(new Button("Button 3"));
        layout.add(new Button("Button 4"));
        layout.add(new Button("Button 5"));
        // end::snippet[]

        this.setClassName("basic-layouts-example");
        this.add(layout);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BasicLayoutsHorizontalLayoutWrapping> { // hidden-source-line
    } // hidden-source-line
}
