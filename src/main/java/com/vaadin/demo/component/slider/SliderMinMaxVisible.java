package com.vaadin.demo.component.slider;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.slider.DecimalSlider;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("slider-min-max-visible")
public class SliderMinMaxVisible extends Div {

    public SliderMinMaxVisible() {
        // tag::snippet[]
        DecimalSlider slider = new DecimalSlider("Temperature", 0, 100);
        slider.setValue(50.0);
        slider.setMinMaxVisible(true);
        add(slider);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<SliderMinMaxVisible> { // hidden-source-line
    } // hidden-source-line
}
