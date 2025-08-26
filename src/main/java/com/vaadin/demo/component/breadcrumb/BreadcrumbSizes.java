package com.vaadin.demo.component.breadcrumb;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.breadcrumb.Breadcrumb;
import com.vaadin.flow.component.breadcrumb.BreadcrumbItem;
import com.vaadin.flow.component.breadcrumb.BreadcrumbVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("breadcrumb-sizes")
public class BreadcrumbSizes extends Div {

    public BreadcrumbSizes() {
        // tag::snippet[]
        VerticalLayout layout = new VerticalLayout();
        
        // Small size
        Breadcrumb smallBreadcrumb = new Breadcrumb();
        smallBreadcrumb.addThemeVariants(BreadcrumbVariant.SMALL);
        smallBreadcrumb.add(
            new BreadcrumbItem("Home", "/"),
            new BreadcrumbItem("Documentation", "/docs"),
            new BreadcrumbItem("Components")
        );
        
        // Normal size (default)
        Breadcrumb normalBreadcrumb = new Breadcrumb();
        normalBreadcrumb.add(
            new BreadcrumbItem("Home", "/"),
            new BreadcrumbItem("Documentation", "/docs"),
            new BreadcrumbItem("Components")
        );
        
        // Large size
        Breadcrumb largeBreadcrumb = new Breadcrumb();
        largeBreadcrumb.addThemeVariants(BreadcrumbVariant.LARGE);
        largeBreadcrumb.add(
            new BreadcrumbItem("Home", "/"),
            new BreadcrumbItem("Documentation", "/docs"),
            new BreadcrumbItem("Components")
        );
        
        layout.add(smallBreadcrumb, normalBreadcrumb, largeBreadcrumb);
        // end::snippet[]

        add(layout);
    }

    public static class Exporter extends DemoExporter<BreadcrumbSizes> { // hidden-source-line
    } // hidden-source-line
}