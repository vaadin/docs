package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("tabs-content")
public class TabsContent extends Div {

	private final Tab details;
	private final Tab payment;
	private final Tab shipping;
	private final VerticalLayout content;

	public TabsContent() {
		// tag::snippet[]
		details = new Tab("Details");
		payment = new Tab("Payment");
		shipping = new Tab("Shipping");

		Tabs tabs = new Tabs(details, payment, shipping);
		tabs.addSelectedChangeListener(event ->
			setContent(event.getSelectedTab())
		);
		// end::snippet[]

		content = new VerticalLayout();
		content.setSpacing(false);
		setContent(tabs.getSelectedTab());

		add(tabs, content);
	}

	private void setContent(Tab tab) {
		content.removeAll();

		if (tab.equals(details)) {
			content.add(new Paragraph("This is the Details tab"));
		} else if (tab.equals(payment)) {
			content.add(new Paragraph("This is the Payment tab"));
		} else {
			content.add(new Paragraph("This is the Shipping tab"));
		}
	}

	public static class Exporter extends DemoExporter<TabsContent> { // hidden-source-line
	} // hidden-source-line
}
