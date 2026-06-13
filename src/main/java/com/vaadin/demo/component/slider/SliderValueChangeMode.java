package com.vaadin.demo.component.slider;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.slider.DecimalSlider;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;

import static com.vaadin.demo.component.Constants.valueChangeModes;

@Route("slider-value-change-mode")
public class SliderValueChangeMode extends VerticalLayout {

    public SliderValueChangeMode() {
        setPadding(false);

        // tag::snippet[]
        var slider = new DecimalSlider("Slider");
        slider.setValue(50.0);
        var modeSelector = new Select<>("Value Change Mode", valueChangeModes);
        modeSelector.setValue(slider.getValueChangeMode());
        modeSelector.addValueChangeListener(e -> {
            slider.setValue(50.0);
            slider.setValueChangeMode(e.getValue());
        });
        var serverSideContent = new Span();
        slider.addValueChangeListener(e -> serverSideContent
                .setText(e.getValue() == null ? "" : e.getValue().toString()));
        // end::snippet[]

        modeSelector.setItemLabelGenerator(ValueChangeMode::name);

        var serverSideLayout = new HorizontalLayout(new Span("Server side:"),
                serverSideContent);

        add(slider, modeSelector, serverSideLayout);
    }

    public static class Exporter extends DemoExporter<SliderValueChangeMode> { // hidden-source-line
    } // hidden-source-line
}
