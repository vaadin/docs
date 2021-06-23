package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.TabVariant;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("tabs-icons-horizontal")
public class TabsIconsHorizontal extends Div {

	public TabsIconsHorizontal() {
		// tag::snippet[]
		Tab profile = new Tab(
			VaadinIcon.USER.create(),
			new Span("Profile")
		);
		Tab settings = new Tab(
			VaadinIcon.COG.create(),
			new Span("Settings")
		);
		Tab notifications = new Tab(
			VaadinIcon.BELL.create(),
			new Span("Notifications")
		);

		// Set the icon on top
		for (Tab tab : new Tab[] { profile, settings, notifications }) {
			tab.addThemeVariants(TabVariant.LUMO_ICON_ON_TOP);
		}

		Tabs tabs = new Tabs(profile, settings, notifications);
		// end::snippet[]
		add(tabs);
	}

	public static class Exporter extends DemoExporter<TabsIconsHorizontal> { // hidden-source-line
	} // hidden-source-line
}
