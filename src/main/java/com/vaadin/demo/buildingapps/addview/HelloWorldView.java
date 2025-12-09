package com.vaadin.demo.buildingapps.addview;

// tag::snippet[]
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("building-apps/add-view/hello")
public class HelloWorldView extends VerticalLayout {

    HelloWorldView() {
        add("Hello, World!");
    }
}
// end::snippet[]