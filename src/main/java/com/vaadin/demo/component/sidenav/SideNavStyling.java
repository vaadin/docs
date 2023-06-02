package com.vaadin.demo.component.sidenav;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.sidenav.SideNav;
import com.vaadin.flow.component.sidenav.SideNavItem;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.component.sidenav.views.DashboardView;
import com.vaadin.demo.component.sidenav.views.InboxView;

@Route("side-nav-styling")
public class SideNavStyling extends Div {

    public SideNavStyling() {
        // tag::snippet[]
        SideNav nav = new SideNav();

        SideNavItem dashboardLink = new SideNavItem("Dashboard", DashboardView.class, VaadinIcon.DASHBOARD.create());
        SideNavItem inboxLink = new SideNavItem("Inbox", InboxView.class, VaadinIcon.ENVELOPE.create());
        SideNavItem vaadinLink = new SideNavItem("Vaadin website", "https://vaadin.com", VaadinIcon.VAADIN_H.create());
        vaadinLink.addClassName("external");
        
        nav.addItem(dashboardLink, inboxLink, vaadinLink);
        // end::snippet[]

        Div navWrapper = new Div(nav);
        nav.setWidthFull();
        add(navWrapper);
        
        this.addClassName("side-nav-sample");
    }

    public static class Exporter extends DemoExporter<SideNavStyling> { // hidden-source-line
    } // hidden-source-line
}
