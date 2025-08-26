package com.vaadin.demo.component.breadcrumb;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.breadcrumb.Breadcrumb;
import com.vaadin.flow.component.breadcrumb.BreadcrumbItem;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLink;

@Route("breadcrumb-router")
public class BreadcrumbRouter extends Div {

    public BreadcrumbRouter() {
        // tag::snippet[]
        Breadcrumb breadcrumb = new Breadcrumb();
        
        BreadcrumbItem homeItem = new BreadcrumbItem();
        homeItem.add(new RouterLink("Home", HomeView.class));
        
        BreadcrumbItem productsItem = new BreadcrumbItem();
        productsItem.add(new RouterLink("Products", ProductsView.class));
        
        BreadcrumbItem electronicsItem = new BreadcrumbItem();
        electronicsItem.add(new RouterLink("Electronics", ElectronicsView.class));
        
        BreadcrumbItem currentItem = new BreadcrumbItem("Laptop Pro X1");
        
        breadcrumb.add(homeItem, productsItem, electronicsItem, currentItem);
        // end::snippet[]

        add(breadcrumb);
    }

    // Example view classes (would be actual views in a real application)
    @Route("home")
    static class HomeView extends Div {}
    
    @Route("products")
    static class ProductsView extends Div {}
    
    @Route("electronics")
    static class ElectronicsView extends Div {}

    public static class Exporter extends DemoExporter<BreadcrumbRouter> { // hidden-source-line
    } // hidden-source-line
}