package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("tabs-icons-vertical")
public class TabsIconsVertical extends Div {

	public TabsIconsVertical() {
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

		Tabs tabs = new Tabs(profile, settings, notifications);
		tabs.setOrientation(Tabs.Orientation.VERTICAL);
		// end::snippet[]
		add(tabs);
	}

	public static class Exporter extends DemoExporter<TabsIconsVertical> { // hidden-source-line
	} // hidden-source-line
}
