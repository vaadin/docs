package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("tabsheet-basic")
public class TabSheetBasic extends Div {

	public TabSheetBasic() {
		// tag::snippet[]
		
		// end::snippet[]
		add(new Text("Tabsheet example"));
	}

	public static class Exporter extends DemoExporter<TabSheetBasic> { // hidden-source-line
	} // hidden-source-line
}
