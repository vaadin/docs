package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.tabs.TabsVariant;
import com.vaadin.flow.router.Route;

@Route("tabs-theme-minimal")
public class TabsThemeMinimal extends Div {

	public TabsThemeMinimal() {
		// tag::snippet[]
		Tab details = new Tab("Details");
		Tab payment = new Tab("Payment");
		Tab shipping = new Tab("Shipping");

		Tabs tabs = new Tabs(details, payment, shipping);
		tabs.addThemeVariants(TabsVariant.LUMO_MINIMAL);
		// end::snippet[]
		add(tabs);
	}

	public static class Exporter extends DemoExporter<TabsThemeMinimal> { // hidden-source-line
	} // hidden-source-line
}
