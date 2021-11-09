package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.tabs.TabsVariant;
import com.vaadin.flow.router.Route;

@Route("tabs-theme-centered")
public class TabsThemeCentered extends Div {

	public TabsThemeCentered() {
		// tag::snippet[]
		Tab details = new Tab("Details");
		Tab payment = new Tab("Payment");
		Tab shipping = new Tab("Shipping");

		Tabs tabs = new Tabs(details, payment, shipping);
		tabs.addThemeVariants(TabsVariant.LUMO_CENTERED);
		// end::snippet[]
		add(tabs);
	}

	public static class Exporter extends DemoExporter<TabsThemeCentered> { // hidden-source-line
	} // hidden-source-line
}
