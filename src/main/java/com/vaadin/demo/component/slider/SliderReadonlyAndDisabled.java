package com.vaadin.demo.component.slider;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.slider.DecimalSlider;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("slider-readonly-and-disabled")
public class SliderReadonlyAndDisabled extends HorizontalLayout {

    public SliderReadonlyAndDisabled() {
        setPadding(false);

        // tag::snippet[]
        DecimalSlider readonlySlider = new DecimalSlider("Read-only");
        readonlySlider.setValue(50.0);
        readonlySlider.setReadOnly(true);

        DecimalSlider disabledSlider = new DecimalSlider("Disabled");
        disabledSlider.setEnabled(false);
        // end::snippet[]

        add(readonlySlider, disabledSlider);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<SliderReadonlyAndDisabled> { // hidden-source-line
    } // hidden-source-line
}
