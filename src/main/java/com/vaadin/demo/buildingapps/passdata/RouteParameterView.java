package com.vaadin.demo.buildingapps.passdata;

import java.util.Optional;

import org.jspecify.annotations.Nullable;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.OptionalParameter;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.signals.Signal;
import com.vaadin.flow.signals.local.ValueSignal;

// tag::snippet[]
@Route("building-apps/pass-data/route-parameter")
public class RouteParameterView extends VerticalLayout
        implements HasUrlParameter<String> {

    private final ValueSignal<String> parameter = new ValueSignal<>(null);

    RouteParameterView() {
        Paragraph parameterValue = new Paragraph();
        add(parameterValue);

        // Update the value by setting the signal
        add(new Button("Set Parameter Value",
                e -> parameter.set("Hello" + System.currentTimeMillis())));

        // Bind the paragraph text to a computed signal
        parameterValue.bindText(() -> Optional.ofNullable(parameter.get())
                .map(value -> "Parameter value: " + value)
                .orElse("No parameter value provided"));

        // Update the URL parameter when the signal changes
        Signal.effect(this, () -> UI.getCurrent()
                .navigate(RouteParameterView.class, parameter.get()));
    }

    @Override
    public void setParameter(BeforeEvent event,
            @OptionalParameter String parameterValue) {
        parameter.set(parameterValue);
    }

    // For use by other views navigating to this view
    public static void showView(@Nullable String parameterValue) {
        UI.getCurrentOrThrow().navigate(RouteParameterView.class,
                parameterValue);
    }
}
// end::snippet[]
