package com.vaadin.demo.component.breadcrumb;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.breadcrumb.Breadcrumb;
import com.vaadin.flow.component.breadcrumb.BreadcrumbItem;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("breadcrumb-navigation")
public class BreadcrumbNavigation extends Div {

    public BreadcrumbNavigation() {
        // tag::snippet[]
        Breadcrumb breadcrumb = new Breadcrumb();
        
        BreadcrumbItem home = new BreadcrumbItem("Home", "/");
        BreadcrumbItem products = new BreadcrumbItem("Products", "/products");
        BreadcrumbItem electronics = new BreadcrumbItem("Electronics", "/products/electronics");
        BreadcrumbItem laptop = new BreadcrumbItem("Laptop Pro X1");
        
        breadcrumb.add(home, products, electronics, laptop);
        // end::snippet[]

        add(breadcrumb);
    }

    public static class Exporter extends DemoExporter<BreadcrumbNavigation> { // hidden-source-line
    } // hidden-source-line
}