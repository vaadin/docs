package com.vaadin.demo.component.breadcrumb;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.breadcrumb.Breadcrumb;
import com.vaadin.flow.component.breadcrumb.BreadcrumbItem;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("breadcrumb-basic")
public class BreadcrumbBasic extends Div {

    public BreadcrumbBasic() {
        // tag::snippet[]
        Breadcrumb breadcrumb = new Breadcrumb();
        
        breadcrumb.add(
            new BreadcrumbItem("Home"),
            new BreadcrumbItem("Products"),
            new BreadcrumbItem("Electronics"),
            new BreadcrumbItem("Laptops")
        );
        // end::snippet[]

        add(breadcrumb);
    }

    public static class Exporter extends DemoExporter<BreadcrumbBasic> { // hidden-source-line
    } // hidden-source-line
}