package com.vaadin.demo.component.applayout;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.tabs.TabsVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLink;

@Route("app-layout-secondary-navigation")
public class AppLayoutSecondaryNavigation extends AppLayout {

  public AppLayoutSecondaryNavigation() {
    // tag::snippet[]
    H1 appTitle = new H1("MyApp");
    appTitle.getStyle()
      .set("font-size", "var(--lumo-font-size-l)")
      .set("line-height", "var(--lumo-size-l)")
      .set("margin", "0 var(--lumo-space-m)");

    Tabs views = new Tabs();
    views.add(
      createTab(VaadinIcon.DASHBOARD, "Dashboard"),
      createTab(VaadinIcon.CART, "Orders"),
      createTab(VaadinIcon.USER_HEART, "Customers"),
      createTab(VaadinIcon.PACKAGE, "Products"),
      createTab(VaadinIcon.RECORDS, "Documents"),
      createTab(VaadinIcon.LIST, "Tasks"),
      createTab(VaadinIcon.CHART, "Analytics")
    );
    views.setOrientation(Tabs.Orientation.VERTICAL);
    views.setSelectedIndex(1);

    DrawerToggle toggle = new DrawerToggle();

    H2 viewTitle = new H2("Orders");
    viewTitle.getStyle()
      .set("font-size", "var(--lumo-font-size-l)")
      .set("margin", "0");

    Tabs subViews = new Tabs();
    subViews.add(
      new Tab("All"),
      new Tab("Open"),
      new Tab("Completed"),
      new Tab("Cancelled")
    );

    HorizontalLayout viewHeader = new HorizontalLayout(toggle, viewTitle);
    viewHeader.setAlignItems(FlexComponent.Alignment.CENTER);
    viewHeader.setSpacing(false);

    addToDrawer(appTitle, views);
    addToNavbar(viewHeader, subViews);

    setPrimarySection(Section.DRAWER);
    // end::snippet[]
  }

  private Tab createTab(VaadinIcon viewIcon, String viewName) {
    Icon icon = viewIcon.create();
    icon.getStyle()
            .set("box-sizing", "border-box")
            .set("margin-inline-end", "var(--lumo-space-m)")
            .set("padding", "var(--lumo-space-xs)");

    RouterLink link = new RouterLink();
    link.add(icon, new Span(viewName));
    // Demo has no routes
    // link.setRoute(viewClass.java);
    link.setTabIndex(-1);

    return new Tab(link);
  }
  public static class Exporter extends DemoExporter<AppLayoutSecondaryNavigation> {} // hidden-source-line
}
