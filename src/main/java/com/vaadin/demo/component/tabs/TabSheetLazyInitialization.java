package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.tabs.TabSheet;
import com.vaadin.flow.function.SerializableSupplier;
import com.vaadin.flow.router.Route;

@Route("tabsheet-lazy-initialization")
public class TabSheetLazyInitialization extends Div {

    public TabSheetLazyInitialization() {
        TabSheet tabSheet = new TabSheet();
        // tag::snippet[]
        tabSheet.add("Dashboard", new LazyComponent(
                () -> new Text("This is the Dashboard tab content")));
        // end::snippet[]
        tabSheet.add("Payment", new LazyComponent(
                () -> new Text("This is the Payment tab content")));
        tabSheet.add("Shipping", new LazyComponent(
                () -> new Text("This is the Shipping tab content")));
        add(tabSheet);

    }
    // tag::snippet[]

    public class LazyComponent extends Div {
        public LazyComponent(
                SerializableSupplier<? extends Component> supplier) {
            addAttachListener(e -> {
                if (getElement().getChildCount() == 0) {
                    add(supplier.get());
                }
            });
        }
    }
    // end::snippet[]

    public static class Exporter extends // hidden-source-line
            DemoExporter<TabSheetLazyInitialization> { // hidden-source-line
    } // hidden-source-line
}
