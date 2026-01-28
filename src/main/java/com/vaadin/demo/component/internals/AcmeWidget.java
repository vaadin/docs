package com.vaadin.demo.component.internals;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.DomEvent;
import com.vaadin.flow.component.EventData;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.shared.Registration;

// tag::class[]
@Tag("acme-widget-wrapper")
@NpmPackage(value = "@acme/widget", version = "2.0.0")
@JsModule("./component-internals/acme-widget-wrapper.ts")
public class AcmeWidget extends Component {

    public record WidgetConfig(String type, boolean animate) {
    }

    public AcmeWidget() {
    }

    public void setTitle(String title) {
        getElement().setProperty("title", title);
    }

    public String getTitle() {
        return getElement().getProperty("title", "");
    }

    public void setConfig(WidgetConfig config) {
        getElement().setPropertyBean("config", config);
    }

    public void setInteractive(boolean interactive) {
        getElement().setProperty("interactive", interactive);
    }

    public boolean isInteractive() {
        return getElement().getProperty("interactive", true);
    }

    public Registration addWidgetChangeListener(
            ComponentEventListener<WidgetChangeEvent> listener) {
        return addListener(WidgetChangeEvent.class, listener);
    }

    @DomEvent("widget-change")
    public static class WidgetChangeEvent extends ComponentEvent<AcmeWidget> {

        private final String label;
        private final double value;

        public WidgetChangeEvent(AcmeWidget source, boolean fromClient,
                @EventData("event.detail.label") String label,
                @EventData("event.detail.value") double value) {
            super(source, fromClient);
            this.label = label;
            this.value = value;
        }

        public String getLabel() {
            return label;
        }

        public double getValue() {
            return value;
        }
    }
}
// end::class[]
