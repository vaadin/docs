package com.vaadin.demo.component.sidenav;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.sidenav.SideNav;
import com.vaadin.flow.component.sidenav.SideNavItem;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.component.sidenav.views.*;

@Route("side-nav-hierarchy")
public class SideNavHierarchy extends Div {

    public SideNavHierarchy() {
        // tag::snippet[]
        SideNav nav = new SideNav();

        SideNavItem messagesLink = new SideNavItem("Messages", MessagesView.class, VaadinIcon.ENVELOPE.create());
        messagesLink.addItem(new SideNavItem("Inbox", InboxView.class, VaadinIcon.INBOX.create()));
        messagesLink.addItem(new SideNavItem("Sent", SentView.class, VaadinIcon.PAPERPLANE.create()));
        messagesLink.addItem(new SideNavItem("Trash", TrashView.class, VaadinIcon.TRASH.create()));
        
        SideNavItem adminSection = new SideNavItem("Admin");
        adminSection.setPrefixComponent(VaadinIcon.COG.create());
        adminSection.addItem(new SideNavItem("Users", UsersView.class, VaadinIcon.GROUP.create()));
        adminSection.addItem(new SideNavItem("Permissions", PermissionsView.class, VaadinIcon.KEY.create()));

        nav.addItem(messagesLink, adminSection);
        // end::snippet[]

        Div navWrapper = new Div(nav);
        nav.setWidthFull();
        add(navWrapper);
        
        this.addClassName("side-nav-sample");
    }

    public static class Exporter extends DemoExporter<SideNavHierarchy> { // hidden-source-line
    } // hidden-source-line
}
