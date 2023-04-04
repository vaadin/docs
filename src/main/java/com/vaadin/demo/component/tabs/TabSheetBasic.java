package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.tabs.TabSheet;
import com.vaadin.flow.router.Route;

@Route("tabsheet-basic")
public class TabSheetBasic extends Div {

    public TabSheetBasic() {
        // tag::snippet[]
        TabSheet tabSheet = new TabSheet();
        tabSheet.add("Dashboard",
                new Div(new Text("This is the Dashboard tab content")));
        tabSheet.add("Payment",
                new Div(new Text("This is the Payment tab content")));
        tabSheet.add("Shipping",
                new Div(new Text("This is the Shipping tab content")));
        add(tabSheet);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<TabSheetBasic> { // hidden-source-line
    } // hidden-source-line
}
