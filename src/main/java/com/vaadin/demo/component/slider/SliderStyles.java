package com.vaadin.demo.component.slider;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.slider.IntegerSlider;
import com.vaadin.flow.component.slider.SliderVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("slider-styles")
public class SliderStyles extends Div {

    public SliderStyles() {
        // tag::snippet[]
        IntegerSlider slider = new IntegerSlider("Label");
        slider.addThemeVariants(SliderVariant.HELPER_ABOVE,
                SliderVariant.LABEL_ASIDE);
        // end::snippet[]
        slider.setHelperText("Helper text");
        add(slider);
    }

    public static class Exporter extends DemoExporter<SliderStyles> { // hidden-source-line
    } // hidden-source-line
}
