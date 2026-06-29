package com.vaadin.demo.component.breadcrumbs;

import com.vaadin.flow.component.breadcrumbs.Breadcrumbs;
import com.vaadin.flow.component.breadcrumbs.BreadcrumbsItem;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("breadcrumbs-overflow")
public class BreadcrumbsOverflow extends Div {

    public BreadcrumbsOverflow() {

        // tag::snippet[]
        Breadcrumbs breadcrumbs = new Breadcrumbs(Breadcrumbs.Mode.MANUAL);

        breadcrumbs.add(new BreadcrumbsItem("Home", "/"),
                new BreadcrumbsItem("Catalog", "/catalog"),
                new BreadcrumbsItem("Electronics", "/catalog/electronics"),
                new BreadcrumbsItem("Computers",
                        "/catalog/electronics/computers"),
                new BreadcrumbsItem("Laptops",
                        "/catalog/electronics/computers/laptops"),
                new BreadcrumbsItem("Model X1"));

        breadcrumbs.setWidth("300px");
        // end::snippet[]

        breadcrumbs.getElement() // hidden-source-line
                .executeJs("window.patchBreadcrumbsNavigation(this);"); // hidden-source-line
        add(breadcrumbs);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BreadcrumbsOverflow> { // hidden-source-line
    } // hidden-source-line
}
