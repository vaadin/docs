package com.vaadin.demo.component.breadcrumbs;

import com.vaadin.flow.component.breadcrumbs.Breadcrumbs;
import com.vaadin.flow.component.breadcrumbs.BreadcrumbsItem;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("breadcrumbs-icons")
public class BreadcrumbsIcons extends Div {

    public BreadcrumbsIcons() {

        // tag::snippet[]
        Breadcrumbs breadcrumbs = new Breadcrumbs(Breadcrumbs.Mode.MANUAL);

        BreadcrumbsItem home = new BreadcrumbsItem("Home", "/",
                VaadinIcon.HOME.create());
        BreadcrumbsItem orders = new BreadcrumbsItem("Orders", "/orders",
                VaadinIcon.PACKAGE.create());
        BreadcrumbsItem current = new BreadcrumbsItem("Order Details");

        breadcrumbs.add(home, orders, current);
        // end::snippet[]

        breadcrumbs.getElement() // hidden-source-line
                .executeJs("window.patchBreadcrumbsNavigation(this);"); // hidden-source-line
        add(breadcrumbs);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BreadcrumbsIcons> { // hidden-source-line
    } // hidden-source-line
}
