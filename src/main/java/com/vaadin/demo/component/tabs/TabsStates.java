package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("tabs-states")
public class TabsStates extends Div {

	public TabsStates() {
		// tag::snippet[]
		Tab selected = new Tab("Selected");

		Tab unselected = new Tab("Unselected");

		Tab disabled = new Tab("Disabled");
		disabled.setEnabled(false);

		Tabs tabs = new Tabs(selected, unselected, disabled);
		tabs.setSelectedTab(selected);
		// end::snippet[]
		add(tabs);
	}

	public static class Exporter extends DemoExporter<TabsStates> { // hidden-source-line
	} // hidden-source-line
}
