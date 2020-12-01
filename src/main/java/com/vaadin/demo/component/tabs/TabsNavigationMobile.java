package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.TabVariant;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("tabs-navigation-mobile")
public class TabsNavigationMobile extends AppLayout {

  public TabsNavigationMobile() {
    // tag::snippet[]
    Tab dashboards = new Tab(new Icon(VaadinIcon.DASHBOARD), new Span("Dashboards"));
    dashboards.addThemeVariants(TabVariant.LUMO_ICON_ON_TOP);

    Tab orders = new Tab(new Icon(VaadinIcon.RECORDS), new Span("Orders"));
    orders.addThemeVariants(TabVariant.LUMO_ICON_ON_TOP);

    Tab customers = new Tab(new Icon(VaadinIcon.USER_HEART), new Span("Customers"));
    customers.addThemeVariants(TabVariant.LUMO_ICON_ON_TOP);

    Tabs tabs = new Tabs(dashboards, orders, customers);
    tabs.setMaxWidth("100%");

    addToNavbar(new H3("MyApp"));
    addToNavbar(true, new DrawerToggle(), tabs);

    // TODO(yuriy): fix addToNavbar with varargs, fix styling, fix display problems

    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TabsNavigationMobile> { // hidden-full-source-line
  } // hidden-full-source-line
}
