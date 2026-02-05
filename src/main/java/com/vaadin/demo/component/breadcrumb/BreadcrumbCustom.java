package com.vaadin.demo.component.breadcrumb;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.breadcrumb.Breadcrumb;
import com.vaadin.flow.component.breadcrumb.BreadcrumbItem;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.router.Route;

@Route("breadcrumb-custom")
public class BreadcrumbCustom extends Div {

    public BreadcrumbCustom() {
        // tag::snippet[]
        Breadcrumb breadcrumb = new Breadcrumb();
        
        BreadcrumbItem home = new BreadcrumbItem("/");
        home.add(new Icon(VaadinIcon.HOME), new Span("Home"));
        
        BreadcrumbItem docs = new BreadcrumbItem("/docs");
        docs.add(new Icon(VaadinIcon.BOOK), new Span("Documentation"));
        
        BreadcrumbItem components = new BreadcrumbItem();
        components.add(new Icon(VaadinIcon.CUBE), new Span("Components"));
        
        breadcrumb.add(home, docs, components);
        // end::snippet[]

        add(breadcrumb);
    }

    public static class Exporter extends DemoExporter<BreadcrumbCustom> { // hidden-source-line
    } // hidden-source-line
}