package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.tabs.TabsVariant;
import com.vaadin.flow.router.Route;

@Route("tabs-hide-scroll-buttons")
public class TabsHideScrollButtons extends Div {

	public TabsHideScrollButtons() {
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
		tabs.addThemeVariants(TabsVariant.LUMO_HIDE_SCROLL_BUTTONS);
		// end::snippet[]
		add(tabs);
	}

	public static class Exporter extends DemoExporter<TabsHideScrollButtons> { // hidden-source-line
	} // hidden-source-line
}
