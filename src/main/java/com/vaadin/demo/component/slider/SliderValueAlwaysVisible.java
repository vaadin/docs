package com.vaadin.demo.component.slider;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.slider.Slider;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("slider-value-always-visible")
public class SliderValueAlwaysVisible extends Div {

    public SliderValueAlwaysVisible() {
        // tag::snippet[]
        Slider slider = new Slider("Brightness", 0, 100, 75);
        // slider.setValueAlwaysVisible(true);
        add(slider);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<SliderValueAlwaysVisible> { // hidden-source-line
    } // hidden-source-line
}
