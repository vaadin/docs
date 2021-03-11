package com.vaadin.demo.component.tabs;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("tabs-basic")
public class TabsBasic extends Div {

	public TabsBasic() {
		// tag::snippet[]

		// end::snippet[]
	}

	public static class Exporter extends DemoExporter<TabsBasic> { // hidden-full-source-line
	} // hidden-full-source-line
}
