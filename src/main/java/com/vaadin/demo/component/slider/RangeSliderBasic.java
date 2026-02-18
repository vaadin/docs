package com.vaadin.demo.component.slider;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.slider.RangeSlider;
import com.vaadin.flow.component.slider.RangeSliderValue;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("range-slider-basic")
public class RangeSliderBasic extends Div {

    public RangeSliderBasic() {
        // tag::snippet[]
        RangeSlider rangeSlider = new RangeSlider("Price range", 0, 1000,
                new RangeSliderValue(200, 800));
        add(rangeSlider);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<RangeSliderBasic> { // hidden-source-line
    } // hidden-source-line
}
