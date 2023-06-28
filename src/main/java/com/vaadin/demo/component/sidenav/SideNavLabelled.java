package com.vaadin.demo.component.sidenav;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.sidenav.SideNav;
import com.vaadin.flow.component.sidenav.SideNavItem;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.component.sidenav.views.InboxView;
import com.vaadin.demo.component.sidenav.views.PermissionsView;
import com.vaadin.demo.component.sidenav.views.SentView;
import com.vaadin.demo.component.sidenav.views.TrashView;
import com.vaadin.demo.component.sidenav.views.UsersView;

@Route("side-nav-labelled")
public class SideNavLabelled extends Div {

    public SideNavLabelled() {

        // tag::snippet[]
        SideNav messagesNav = new SideNav();
        messagesNav.setLabel("Messages");
        messagesNav.addItem(new SideNavItem("Inbox", InboxView.class, VaadinIcon.INBOX.create()));
        messagesNav.addItem(new SideNavItem("Sent", SentView.class, VaadinIcon.PAPERPLANE.create()));
        messagesNav.addItem(new SideNavItem("Trash", TrashView.class, VaadinIcon.TRASH.create()));

        SideNav adminNav = new SideNav();
        adminNav.setLabel("Admin");
        adminNav.setCollapsible(true);
        adminNav.addItem(new SideNavItem("Users", UsersView.class, VaadinIcon.GROUP.create()));
        adminNav.addItem(new SideNavItem("Permissions", PermissionsView.class, VaadinIcon.KEY.create()));

        // end::snippet[]

        VerticalLayout navWrapper = new VerticalLayout(messagesNav, adminNav);
        navWrapper.setSpacing(true);
        navWrapper.setSizeUndefined();
        messagesNav.setWidthFull();
        adminNav.setWidthFull();
        add(navWrapper);

        messagesNav.getElement().executeJs("window.patchSideNavNavigation(this);"); // hidden-source-line
        adminNav.getElement().executeJs("window.patchSideNavNavigation(this);"); // hidden-source-line

        this.addClassName("side-nav-sample");
    }

    public static class Exporter extends DemoExporter<SideNavLabelled> { // hidden-source-line
    } // hidden-source-line
}
