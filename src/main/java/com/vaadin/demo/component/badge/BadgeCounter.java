package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("badge-counter")
public class BadgeCounter extends Div {

    public BadgeCounter() {
        // tag::snippet1[]
        Tabs tabs = new Tabs(
                createTab("Inbox", 12),
                createTab("Important", 3),
                createTab("Spam", 45),
                createTab("Archive", 23)
        );
        // end::snippet1[]

        add(tabs);
    }

    // tag::snippet2[]
    private static Tab createTab(String labelText, int messageCount) {
        Span label = new Span(labelText);
        Span counter = new Span(String.valueOf(messageCount));
        counter.getElement().getThemeList().add("badge pill small contrast");
        counter.getStyle().set("margin-inline-start", "var(--lumo-space-s)");
        // Accessible badge label
        String counterLabel = String.format("%d unread messages", messageCount);
        counter.getElement().setAttribute("aria-label", counterLabel);
        counter.getElement().setAttribute("title", counterLabel);

        return new Tab(label, counter);
    }
    // end::snippet2[]

    public static class Exporter extends DemoExporter<BadgeCounter> { // hidden-source-line
    } // hidden-source-line
}
