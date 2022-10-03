package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.tabs.TabSheet;
import com.vaadin.flow.component.tabs.TabSheetVariant;
import com.vaadin.flow.router.Route;

@Route("tabsheet-theme-bordered")
public class TabSheetThemeBordered extends Div {

    public TabSheetThemeBordered() {
        TabSheet tabSheet = new TabSheet();
        tabSheet.add("Dashboard",
                new Div(new Text("This is the Dashboard tab content")));
        tabSheet.add("Payment",
                new Div(new Text("This is the Payment tab content")));
        tabSheet.add("Shipping",
                new Div(new Text("This is the Shipping tab content")));
        // tag::snippet[]
        tabSheet.addThemeVariants(TabSheetVariant.LUMO_BORDERED);
        // end::snippet[]
        add(tabSheet);
    }

    public static class Exporter extends DemoExporter<TabSheetThemeBordered> { // hidden-source-line
    } // hidden-source-line
}
