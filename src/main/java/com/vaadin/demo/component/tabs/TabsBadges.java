package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter; // hidden-source-line
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
			new Span("Open"),
			createBadge(24)
		);
		Tab completed = new Tab(
			new Span("Completed"),
			createBadge(439)
		);
		Tab cancelled = new Tab(
			new Span("Cancelled"),
			createBadge(5)
		);

		Tabs tabs = new Tabs(open, completed, cancelled);
		// end::snippet[]
		add(tabs);
	}

	/**
	 * Helper method for creating a badge.
	 */
	private Span createBadge(int value) {
		Span badge = new Span(String.valueOf(value));
		badge.getElement().getThemeList().add("badge small contrast");
		badge.getStyle().set("margin-inline-start", "var(--lumo-space-xs)");
		return badge;
	}

	public static class Exporter extends DemoExporter<TabsBadges> { // hidden-source-line
	} // hidden-source-line
}
