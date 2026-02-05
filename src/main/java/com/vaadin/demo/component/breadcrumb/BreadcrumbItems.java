package com.vaadin.demo.component.breadcrumb;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.breadcrumb.Breadcrumb;
import com.vaadin.flow.component.breadcrumb.BreadcrumbItem;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("breadcrumb-items")
public class BreadcrumbItems extends Div {

    public BreadcrumbItems() {
        // tag::snippet[]
        Breadcrumb breadcrumb = new Breadcrumb();
        
        BreadcrumbItem dashboard = new BreadcrumbItem("Dashboard");
        BreadcrumbItem reports = new BreadcrumbItem("Reports");
        BreadcrumbItem monthly = new BreadcrumbItem("Monthly");
        BreadcrumbItem year2024 = new BreadcrumbItem("2024");
        BreadcrumbItem january = new BreadcrumbItem("January");
        
        breadcrumb.add(dashboard);
        breadcrumb.add(reports);
        breadcrumb.add(monthly);
        breadcrumb.add(year2024);
        breadcrumb.add(january);
        // end::snippet[]

        add(breadcrumb);
    }

    public static class Exporter extends DemoExporter<BreadcrumbItems> { // hidden-source-line
    } // hidden-source-line
}