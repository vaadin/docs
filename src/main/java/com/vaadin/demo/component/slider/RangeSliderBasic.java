package com.vaadin.demo.component.slider;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.slider.DecimalRangeSlider;
import com.vaadin.flow.component.slider.DecimalRangeSliderValue;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("range-slider-basic")
public class RangeSliderBasic extends Div {

    public RangeSliderBasic() {
        // tag::snippet[]
        DecimalRangeSlider rangeSlider = new DecimalRangeSlider("Price range",
                0, 1000);
        rangeSlider.setValue(new DecimalRangeSliderValue(200.0, 800.0));
        add(rangeSlider);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<RangeSliderBasic> { // hidden-source-line
    } // hidden-source-line
}
