package com.vaadin.demo.component.slider;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.slider.IntegerSlider;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("slider-value-always-visible")
public class SliderValueAlwaysVisible extends Div {

    public SliderValueAlwaysVisible() {
        // tag::snippet[]
        IntegerSlider slider = new IntegerSlider("Brightness", 0, 100);
        slider.setValue(75);
        slider.setValueAlwaysVisible(true);
        add(slider);
        // end::snippet[]
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<SliderValueAlwaysVisible> { // hidden-source-line
    } // hidden-source-line
}
