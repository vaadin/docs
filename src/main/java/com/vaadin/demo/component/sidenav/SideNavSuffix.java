package com.vaadin.demo.component.sidenav;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
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

        SideNavItem inboxLink = new SideNavItem("Inbox", InboxView.class, VaadinIcon.ENVELOPE.create());
        Span inboxCounter = new Span("12");
        inboxCounter.getElement().getThemeList().add("badge contrast pill");
        inboxCounter.getElement().setAttribute("aria-label", "12 unread messages");
        inboxLink.setSuffixComponent(inboxCounter);

        SideNavItem calendarLink = new SideNavItem("Calendar", CalendarView.class, VaadinIcon.CALENDAR.create());
        Icon calendarNotification = VaadinIcon.BELL.create();
        calendarNotification.getElement().getThemeList().add("badge error pill");
        calendarNotification.getStyle().set("padding", "var(--lumo-space-xs");
        calendarNotification.getElement().setAttribute("aria-label", "Upcoming appointment");
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
