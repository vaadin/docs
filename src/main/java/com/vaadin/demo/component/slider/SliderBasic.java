package com.vaadin.demo.component.slider;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.slider.Slider;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("slider-basic")
public class SliderBasic extends Div {

    public SliderBasic() {
        // tag::snippet[]
        Slider slider = new Slider("Volume");
        slider.setValue(50.0);
        add(slider);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<SliderBasic> { // hidden-source-line
    } // hidden-source-line
}
