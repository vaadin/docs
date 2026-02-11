package com.vaadin.demo.component.rangeslider;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.slider.RangeSlider;
import com.vaadin.flow.component.slider.RangeSliderValue;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("range-slider-min-max-visible")
public class RangeSliderMinMaxVisible extends Div {

    public RangeSliderMinMaxVisible() {
        // tag::snippet[]
        RangeSlider rangeSlider = new RangeSlider("Temperature",
                0, 100, new RangeSliderValue(20, 80));
        // rangeSlider.setMinMaxVisible(true);
        add(rangeSlider);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<RangeSliderMinMaxVisible> { // hidden-source-line
    } // hidden-source-line
}
