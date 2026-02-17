package com.vaadin.demo.component.slider;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.slider.Slider;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("slider-step")
public class SliderStep extends Div {

    public SliderStep() {
        // tag::snippet[]
        Slider slider = new Slider("Volume", 0, 10, 5);
        slider.setStep(0.5);
        add(slider);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<SliderStep> { // hidden-source-line
    } // hidden-source-line
}
