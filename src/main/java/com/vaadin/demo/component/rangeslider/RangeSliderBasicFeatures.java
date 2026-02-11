package com.vaadin.demo.component.rangeslider;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.slider.RangeSlider;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("range-slider-basic-features")
public class RangeSliderBasicFeatures extends Div {

    public RangeSliderBasicFeatures() {
        // tag::snippet[]
        RangeSlider rangeSlider = new RangeSlider("Label");
        rangeSlider.setHelperText("Helper text");
        add(rangeSlider);
        // end::snippet[]
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<RangeSliderBasicFeatures> { // hidden-source-line
    } // hidden-source-line
}
