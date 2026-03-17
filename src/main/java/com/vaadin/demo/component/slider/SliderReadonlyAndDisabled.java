package com.vaadin.demo.component.slider;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.slider.Slider;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("slider-readonly-and-disabled")
public class SliderReadonlyAndDisabled extends HorizontalLayout {

    public SliderReadonlyAndDisabled() {
        setPadding(false);

        // tag::snippet[]
        Slider readonlySlider = new Slider("Read-only");
        readonlySlider.setValue(50.0);
        readonlySlider.setReadOnly(true);

        Slider disabledSlider = new Slider("Disabled");
        disabledSlider.setEnabled(false);
        // end::snippet[]

        add(readonlySlider, disabledSlider);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<SliderReadonlyAndDisabled> { // hidden-source-line
    } // hidden-source-line
}
