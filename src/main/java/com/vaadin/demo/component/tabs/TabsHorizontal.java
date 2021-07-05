package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("tabs-horizontal")
public class TabsHorizontal extends Div {

	public TabsHorizontal() {
		// tag::snippet[]
		Tab analytics = new Tab("Analytics");
		Tab customers = new Tab("Customers");
		Tab dashboards = new Tab("Dashboards");
		Tab documents = new Tab("Documents");
		Tab orders = new Tab("Orders");

		Tabs tabs = new Tabs(analytics, customers, dashboards, documents, orders);
		tabs.setMaxWidth("100%");
		tabs.setWidth("400px");
		// end::snippet[]
		add(tabs);
	}

	public static class Exporter extends DemoExporter<TabsHorizontal> { // hidden-source-line
	} // hidden-source-line
}
