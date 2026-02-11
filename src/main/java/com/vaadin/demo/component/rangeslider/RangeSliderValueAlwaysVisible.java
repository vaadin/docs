package com.vaadin.demo.component.rangeslider;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.slider.RangeSlider;
import com.vaadin.flow.component.slider.RangeSliderValue;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("range-slider-value-always-visible")
public class RangeSliderValueAlwaysVisible extends Div {

    public RangeSliderValueAlwaysVisible() {
        // tag::snippet[]
        RangeSlider rangeSlider = new RangeSlider("Brightness",
                0, 100, new RangeSliderValue(25, 75));
        // rangeSlider.setValueAlwaysVisible(true);
        add(rangeSlider);
        // end::snippet[]
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<RangeSliderValueAlwaysVisible> { // hidden-source-line
    } // hidden-source-line
}
