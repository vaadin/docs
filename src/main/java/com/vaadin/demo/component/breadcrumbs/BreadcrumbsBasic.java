package com.vaadin.demo.component.breadcrumbs;

import com.vaadin.flow.component.breadcrumbs.Breadcrumbs;
import com.vaadin.flow.component.breadcrumbs.BreadcrumbsItem;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("breadcrumbs-basic")
public class BreadcrumbsBasic extends Div {

    public BreadcrumbsBasic() {

        // tag::snippet[]
        Breadcrumbs breadcrumbs = new Breadcrumbs(Breadcrumbs.Mode.MANUAL);

        BreadcrumbsItem home = new BreadcrumbsItem("Home", "/");
        BreadcrumbsItem components = new BreadcrumbsItem("Components",
                "/components");
        BreadcrumbsItem current = new BreadcrumbsItem("Breadcrumbs");

        breadcrumbs.add(home, components, current);
        // end::snippet[]

        breadcrumbs.getElement() // hidden-source-line
                .executeJs("window.patchBreadcrumbsNavigation(this);"); // hidden-source-line
        add(breadcrumbs);
    }

    public static class Exporter extends DemoExporter<BreadcrumbsBasic> { // hidden-source-line
    } // hidden-source-line
}
