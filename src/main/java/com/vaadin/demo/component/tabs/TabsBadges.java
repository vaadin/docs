package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("tabs-badges")
public class TabsBadges extends Div {

	public TabsBadges() {
		// tag::snippet[]
		Tab open = new Tab(
			createBadge(24),
			new Span("Open")
		);
		Tab completed = new Tab(
			createBadge(439),
			new Span("Completed")
		);
		Tab cancelled = new Tab(
			createBadge(5),
			new Span("Cancelled")
		);

		Tabs tabs = new Tabs(
			open, completed, cancelled
		);
		// end::snippet[]
		add(tabs);
	}

	/**
	 * Helper method for creating a badge.
	 */
	private Span createBadge(int value) {
		Span badge = new Span(String.valueOf(value));
		badge.getElement().getThemeList().add("badge small contrast");
		return badge;
	}

	public static class Exporter extends DemoExporter<TabsBadges> { // hidden-full-source-line
	} // hidden-full-source-line
}
