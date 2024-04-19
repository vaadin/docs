package com.vaadin.demo.component.applayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.theme.lumo.LumoUtility;

@Route("app-layout-bottom-navbar")
// tag::snippet[]
public class AppLayoutBottomNavbar extends AppLayout {

    public AppLayoutBottomNavbar() {
        getElement().getStyle().set("--vaadin-app-layout-touch-optimized", // hidden-source-line
                "true"); // hidden-source-line
        H1 title = new H1("MyApp");
        title.getStyle().set("font-size", "var(--lumo-font-size-l)")
                .set("margin", "var(--lumo-space-m) var(--lumo-space-l)");

        HorizontalLayout nav = getNavigation();
        nav.getElement().executeJs("window.patchAppLayoutNavigation(this);"); // hidden-source-line

        H2 viewTitle = new H2("View title");
        Paragraph viewContent = new Paragraph("View content");

        Div content = new Div();
        content.add(viewTitle, viewContent);

        addToNavbar(title);
        addToNavbar(true, nav);

        setContent(content);
    }
    // end::snippet[]

    private HorizontalLayout getNavigation() {
            HorizontalLayout navigation = new HorizontalLayout();
            navigation.addClassNames(LumoUtility.Width.FULL,
                            LumoUtility.JustifyContent.EVENLY,
                            LumoUtility.AlignSelf.STRETCH);
            navigation.setPadding(false);
            navigation.setSpacing(false);
            navigation.add(createLink(VaadinIcon.DASHBOARD, "Dashboard"),
                            createLink(VaadinIcon.CART, "Orders"),
                            createLink(VaadinIcon.USER_HEART, "Customers"),
                            createLink(VaadinIcon.PACKAGE, "Products"));

            return navigation;
    }

    private RouterLink createLink(VaadinIcon icon, String viewName) {
            RouterLink link = new RouterLink();
            // Demo has no routes
            // link.setRoute(viewClass.java);
            link.addClassNames(LumoUtility.Display.FLEX,
                            LumoUtility.AlignItems.CENTER,
                            LumoUtility.Padding.Horizontal.LARGE,
                            LumoUtility.TextColor.SECONDARY);
            link.add(icon.create());
            // hidden-source-line: workaround to make text color work
            link.getElement().setAttribute("href", viewName); // hidden-source-line
            link.getElement().setAttribute("aria-label", viewName);
            return link;
    }

    public static class Exporter extends DemoExporter<AppLayoutBottomNavbar> { // hidden-source-line
    } // hidden-source-line
      // tag::snippet[]
}
// end::snippet[]
