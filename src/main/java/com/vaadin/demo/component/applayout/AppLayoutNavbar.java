package com.vaadin.demo.component.applayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.theme.lumo.LumoUtility;

@Route("app-layout-navbar")
// tag::snippet[]
public class AppLayoutNavbar extends AppLayout {

    public AppLayoutNavbar() {
        H1 title = new H1("MyApp");
        title.getStyle().set("font-size", "var(--lumo-font-size-l)")
                .set("left", "var(--lumo-space-l)").set("margin", "0")
                .set("position", "absolute");

        HorizontalLayout navigation = getNavigation();
        navigation.getElement()
                .executeJs("window.patchAppLayoutNavigation(this);"); // hidden-source-line

        addToNavbar(title, navigation);
    }
    // end::snippet[]

    private HorizontalLayout getNavigation() {
        HorizontalLayout navigation = new HorizontalLayout();
        navigation.addClassNames(LumoUtility.JustifyContent.CENTER,
                LumoUtility.Gap.SMALL, LumoUtility.Height.MEDIUM,
                LumoUtility.Width.FULL);
        navigation.add(createLink("Dashboard"), createLink("Orders"),
                createLink("Customers"), createLink("Products"));
        return navigation;
    }

    private RouterLink createLink(String viewName) {
        RouterLink link = new RouterLink();
        link.add(viewName);
        // Demo has no routes
        // link.setRoute(viewClass.java);

        link.addClassNames(LumoUtility.Display.FLEX,
                LumoUtility.AlignItems.CENTER,
                LumoUtility.Padding.Horizontal.MEDIUM,
                LumoUtility.TextColor.SECONDARY, LumoUtility.FontWeight.MEDIUM);
        link.getStyle().set("text-decoration", "none");
        // hidden-source-line: workaround to make text color work
        link.getElement().setAttribute("href", viewName); // hidden-source-line

        return link;
    }

    public static class Exporter extends DemoExporter<AppLayoutNavbar> { // hidden-source-line
    } // hidden-source-line
      // tag::snippet[]
}
// end::snippet[]
