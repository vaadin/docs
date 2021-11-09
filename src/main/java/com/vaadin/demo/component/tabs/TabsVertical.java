package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("tabs-vertical")
public class TabsVertical extends Div {

	public TabsVertical() {
		// tag::snippet[]
		Tab analytics = new Tab("Analytics");
		Tab customers = new Tab("Customers");
		Tab dashboards = new Tab("Dashboards");
		Tab documents = new Tab("Documents");
		Tab orders = new Tab("Orders");
		Tab products = new Tab("Products");
		Tab tasks = new Tab("Tasks");

		Tabs tabs = new Tabs(
			analytics, customers, dashboards, documents, orders, products, tasks
		);
		tabs.setOrientation(Tabs.Orientation.VERTICAL);
		tabs.setHeight("240px");
		tabs.setWidth("240px");
		// end::snippet[]
		add(tabs);
	}

	public static class Exporter extends DemoExporter<TabsVertical> { // hidden-source-line
	} // hidden-source-line
}
