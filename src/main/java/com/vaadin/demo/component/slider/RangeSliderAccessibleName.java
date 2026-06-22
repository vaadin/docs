package com.vaadin.demo.component.slider;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.slider.IntegerRangeSlider;
import com.vaadin.flow.component.slider.IntegerRangeSliderValue;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("range-slider-accessible-name")
public class RangeSliderAccessibleName extends Div {

    public RangeSliderAccessibleName() {
        // tag::snippet[]
        IntegerRangeSlider rangeSlider = new IntegerRangeSlider("Price range",
                0, 1000);
        rangeSlider.setValue(new IntegerRangeSliderValue(200, 800));
        rangeSlider.setAccessibleNameStart("Minimum price");
        rangeSlider.setAccessibleNameEnd("Maximum price");
        add(rangeSlider);
        // end::snippet[]
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<RangeSliderAccessibleName> { // hidden-source-line
    } // hidden-source-line
}
