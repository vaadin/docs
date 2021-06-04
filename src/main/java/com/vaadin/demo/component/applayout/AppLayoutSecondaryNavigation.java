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
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLink;

@Route("app-layout-secondary-navigation")
// tag::snippet[]
public class AppLayoutSecondaryNavigation extends AppLayout {

  public AppLayoutSecondaryNavigation() {
    H1 appTitle = new H1("MyApp");
    appTitle.getStyle()
      .set("font-size", "var(--lumo-font-size-l)")
      .set("line-height", "var(--lumo-size-l)")
      .set("margin", "0 var(--lumo-space-m)");

    Tabs views = getPrimaryNavigation();

    DrawerToggle toggle = new DrawerToggle();

    H2 viewTitle = new H2("Orders");
    viewTitle.getStyle()
      .set("font-size", "var(--lumo-font-size-l)")
      .set("margin", "0");

    Tabs subViews = getSecondaryNavigation();

    HorizontalLayout wrapper = new HorizontalLayout(toggle, viewTitle);
    wrapper.setAlignItems(FlexComponent.Alignment.CENTER);
    wrapper.setSpacing(false);

    VerticalLayout viewHeader = new VerticalLayout(wrapper, subViews);
    viewHeader.setPadding(false);
    viewHeader.setSpacing(false);

    addToDrawer(appTitle, views);
    addToNavbar(viewHeader);

    setPrimarySection(Section.DRAWER);
  }
  // end::snippet[]

  private Tabs getPrimaryNavigation() {
    Tabs tabs = new Tabs();
    tabs.add(
      createTab(VaadinIcon.DASHBOARD, "Dashboard"),
      createTab(VaadinIcon.CART, "Orders"),
      createTab(VaadinIcon.USER_HEART, "Customers"),
      createTab(VaadinIcon.PACKAGE, "Products"),
      createTab(VaadinIcon.RECORDS, "Documents"),
      createTab(VaadinIcon.LIST, "Tasks"),
      createTab(VaadinIcon.CHART, "Analytics")
    );
    tabs.setOrientation(Tabs.Orientation.VERTICAL);
    tabs.setSelectedIndex(1);
    return tabs;
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

  private Tabs getSecondaryNavigation() {
    Tabs tabs = new Tabs();
    tabs.add(
            new Tab("All"),
            new Tab("Open"),
            new Tab("Completed"),
            new Tab("Cancelled")
    );
    return tabs;
  }
  public static class Exporter extends DemoExporter<AppLayoutSecondaryNavigation> {} // hidden-source-line
  // tag::snippet[]
}
// end::snippet[]
