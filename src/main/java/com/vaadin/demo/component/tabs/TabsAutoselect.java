package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("tabs-autoselect")
public class TabsAutoselect extends Div {

    public TabsAutoselect() {
        Tab details = new Tab("Details");
        Tab payment = new Tab("Payment");
        Tab shipping = new Tab("Shipping");
        // tag::snippet[]
        Tabs tabs = new Tabs();
        tabs.setAutoselect(false);
        // end::snippet[]
        tabs.addSelectedChangeListener(event -> Notification.show("Selected "
                + event.getSelectedTab().getLabel()));
        tabs.add(details, payment, shipping);
        add(tabs);
    }

    public static class Exporter extends DemoExporter<TabsAutoselect> { // hidden-source-line
    } // hidden-source-line
}
