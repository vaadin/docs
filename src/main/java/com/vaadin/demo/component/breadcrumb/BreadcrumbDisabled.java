package com.vaadin.demo.component.breadcrumb;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.breadcrumb.Breadcrumb;
import com.vaadin.flow.component.breadcrumb.BreadcrumbItem;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("breadcrumb-disabled")
public class BreadcrumbDisabled extends Div {

    public BreadcrumbDisabled() {
        // tag::snippet[]
        Breadcrumb breadcrumb = new Breadcrumb();
        
        BreadcrumbItem home = new BreadcrumbItem("Home", "/");
        
        BreadcrumbItem products = new BreadcrumbItem("Products", "/products");
        
        BreadcrumbItem electronics = new BreadcrumbItem("Electronics (Unavailable)", "/products/electronics");
        electronics.setEnabled(false);
        
        BreadcrumbItem laptop = new BreadcrumbItem("Laptop");
        
        breadcrumb.add(home, products, electronics, laptop);
        // end::snippet[]

        add(breadcrumb);
    }

    public static class Exporter extends DemoExporter<BreadcrumbDisabled> { // hidden-source-line
    } // hidden-source-line
}