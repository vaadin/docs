package com.vaadin.demo.component.slider;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.slider.DecimalSlider;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("slider-basic-features")
public class SliderBasicFeatures extends Div {

    public SliderBasicFeatures() {
        // tag::snippet[]
        DecimalSlider slider = new DecimalSlider("Label");
        slider.setHelperText("Helper text");
        add(slider);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<SliderBasicFeatures> { // hidden-source-line
    } // hidden-source-line
}
