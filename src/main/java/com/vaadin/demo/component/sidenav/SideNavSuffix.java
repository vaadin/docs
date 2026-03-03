package com.vaadin.demo.component.sidenav;

import com.vaadin.flow.component.badge.Badge;
import com.vaadin.flow.component.badge.BadgeVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.sidenav.SideNav;
import com.vaadin.flow.component.sidenav.SideNavItem;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.component.sidenav.views.CalendarView;
import com.vaadin.demo.component.sidenav.views.InboxView;

@Route("side-nav-suffix")
public class SideNavSuffix extends Div {

    public SideNavSuffix() {
        // tag::snippet[]
        SideNav nav = new SideNav();

        SideNavItem inboxLink = new SideNavItem("Inbox", InboxView.class,
                VaadinIcon.ENVELOPE.create());
        Badge inboxCounter = new Badge("unread messages", 12);
        inboxCounter.addThemeVariants(BadgeVariant.FILLED,
                BadgeVariant.NUMBER_ONLY);
        inboxLink.setSuffixComponent(inboxCounter);

        SideNavItem calendarLink = new SideNavItem("Calendar",
                CalendarView.class, VaadinIcon.CALENDAR.create());
        Badge calendarNotification = new Badge("Upcoming appointment");
        calendarNotification.setIcon(VaadinIcon.BELL.create());
        calendarNotification.addThemeVariants(BadgeVariant.ERROR,
                BadgeVariant.ICON_ONLY);
        calendarLink.setSuffixComponent(calendarNotification);

        nav.addItem(inboxLink, calendarLink);
        // end::snippet[]

        Div navWrapper = new Div(nav);
        nav.setWidthFull();
        add(navWrapper);

        nav.getElement().executeJs("window.patchSideNavNavigation(this);"); // hidden-source-line

        this.addClassName("side-nav-sample");
    }

    public static class Exporter extends DemoExporter<SideNavSuffix> { // hidden-source-line
    } // hidden-source-line
}
