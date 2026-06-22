package com.vaadin.demo.component.slider;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.slider.IntegerRangeSlider;
import com.vaadin.flow.component.slider.IntegerRangeSliderValue;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("range-slider-basic")
public class RangeSliderBasic extends Div {

    public RangeSliderBasic() {
        // tag::snippet[]
        IntegerRangeSlider rangeSlider = new IntegerRangeSlider("Price range",
                0, 1000);
        rangeSlider.setValue(new IntegerRangeSliderValue(200, 800));
        add(rangeSlider);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<RangeSliderBasic> { // hidden-source-line
    } // hidden-source-line
}
