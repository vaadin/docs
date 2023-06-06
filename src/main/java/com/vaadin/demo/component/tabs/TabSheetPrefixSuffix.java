package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.tabs.TabSheet;
import com.vaadin.flow.router.Route;

@Route("tabsheet-prefix-suffix")
public class TabSheetPrefixSuffix extends Div {

    public TabSheetPrefixSuffix() {
        TabSheet tabSheet = new TabSheet();
        tabSheet.add("Dashboard",
                new Div(new Text("This is the Dashboard tab content")));
        tabSheet.add("Payment",
                new Div(new Text("This is the Payment tab content")));
        tabSheet.add("Shipping",
                new Div(new Text("This is the Shipping tab content")));

        // tag::snippet[]
        tabSheet.setPrefixComponent(new Button("Close all"));

        Button plusButton = new Button(new Icon(VaadinIcon.PLUS));
        plusButton.addThemeVariants(ButtonVariant.LUMO_ICON);
        plusButton.setAriaLabel("Add tab");
        tabSheet.setSuffixComponent(plusButton);
        // end::snippet[]

        add(tabSheet);
    }

    public static class Exporter extends DemoExporter<TabSheetPrefixSuffix> { // hidden-source-line
    } // hidden-source-line
}
