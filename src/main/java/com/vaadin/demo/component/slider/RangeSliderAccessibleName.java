package com.vaadin.demo.component.slider;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.slider.RangeSlider;
import com.vaadin.flow.component.slider.RangeSliderValue;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("range-slider-accessible-name")
public class RangeSliderAccessibleName extends Div {

    public RangeSliderAccessibleName() {
        // tag::snippet[]
        RangeSlider rangeSlider = new RangeSlider("Price range",
                0, 1000, new RangeSliderValue(200, 800));
        // TODO uncomment
        // rangeSlider.setAccessibleNameStart("Minimum price");
        // rangeSlider.setAccessibleNameEnd("Maximum price");
        add(rangeSlider);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<RangeSliderAccessibleName> { // hidden-source-line
    } // hidden-source-line
}
