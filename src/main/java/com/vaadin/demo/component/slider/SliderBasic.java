package com.vaadin.demo.component.slider;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.slider.IntegerSlider;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("slider-basic")
public class SliderBasic extends Div {

    public SliderBasic() {
        // tag::snippet[]
        IntegerSlider slider = new IntegerSlider("Volume");
        slider.setValue(50);
        add(slider);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<SliderBasic> { // hidden-source-line
    } // hidden-source-line
}
