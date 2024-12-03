package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/horizontal-layout-wrapping")
public class BasicLayoutsHorizontalLayoutWrapping extends Div {

    public BasicLayoutsHorizontalLayoutWrapping() {
        HorizontalLayout layoutNoWrap = new HorizontalLayout();
        layoutNoWrap.setPadding(true);
        layoutNoWrap.setSpacing(true);
        layoutNoWrap.setMargin(true);
        layoutNoWrap.setWidth("350px");
        layoutNoWrap.add(new Button("Button 1"));
        layoutNoWrap.add(new Button("Button 2"));
        layoutNoWrap.add(new Button("Button 3"));
        layoutNoWrap.add(new Button("Button 4"));
        layoutNoWrap.add(new Button("Button 5"));
        this.add(layoutNoWrap);

        // tag::snippet[]
        HorizontalLayout layoutWithWrap = new HorizontalLayout();
        layoutWithWrap.setWrap(true);
        // end::snippet[]
        layoutWithWrap.setMargin(true);
        layoutWithWrap.setPadding(true);
        layoutWithWrap.setSpacing(true);
        layoutWithWrap.setWidth("350px");
        layoutWithWrap.add(new Button("Button 1"));
        layoutWithWrap.add(new Button("Button 2"));
        layoutWithWrap.add(new Button("Button 3"));
        layoutWithWrap.add(new Button("Button 4"));
        layoutWithWrap.add(new Button("Button 5"));

        this.setClassName("basic-layouts-example");
        this.add(layoutWithWrap);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BasicLayoutsHorizontalLayoutWrapping> { // hidden-source-line
    } // hidden-source-line
}
