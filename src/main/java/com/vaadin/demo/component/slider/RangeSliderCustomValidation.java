package com.vaadin.demo.component.slider;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.slider.RangeSlider;
import com.vaadin.flow.component.slider.RangeSliderValue;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("range-slider-custom-validation")
public class RangeSliderCustomValidation extends Div {

    public RangeSliderCustomValidation() {
        // tag::snippet[]
        RangeSlider rangeSlider = new RangeSlider("Duration of Stay", 1, 30,
                new RangeSliderValue(5, 14));

        rangeSlider.addValueChangeListener(e -> {
            RangeSliderValue value = e.getValue();
            double range = value.getEnd() - value.getStart();
            if (range < 3) {
                rangeSlider.setErrorMessage(
                        "The stay must be at least 3 days");
                rangeSlider.setInvalid(true);
            } else {
                rangeSlider.setInvalid(false);
            }
        });

        add(rangeSlider);
        // end::snippet[]
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<RangeSliderCustomValidation> { // hidden-source-line
    } // hidden-source-line
}
