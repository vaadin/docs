package com.vaadin.demo.component.rangeslider;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.slider.RangeSlider;
import com.vaadin.flow.component.slider.RangeSliderValue;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("range-slider-readonly-and-disabled")
public class RangeSliderReadonlyAndDisabled extends HorizontalLayout {

    public RangeSliderReadonlyAndDisabled() {
        setPadding(false);

        // tag::snippet[]
        RangeSlider readonlySlider = new RangeSlider("Read-only",
                0, 100, new RangeSliderValue(20, 80));
        readonlySlider.setReadOnly(true);

        RangeSlider disabledSlider = new RangeSlider("Disabled");
        disabledSlider.setEnabled(false);
        // end::snippet[]

        add(readonlySlider, disabledSlider);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<RangeSliderReadonlyAndDisabled> { // hidden-source-line
    } // hidden-source-line
}
