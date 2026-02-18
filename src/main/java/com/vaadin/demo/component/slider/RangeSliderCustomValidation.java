package com.vaadin.demo.component.slider;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.slider.RangeSlider;
import com.vaadin.flow.component.slider.RangeSliderValue;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("range-slider-custom-validation")
public class RangeSliderCustomValidation extends Div {

    public static class PriceFilter {
        private int minPrice = 200;
        private int maxPrice = 800;

        public int getMinPrice() {
            return minPrice;
        }

        public void setMinPrice(int minPrice) {
            this.minPrice = minPrice;
        }

        public int getMaxPrice() {
            return maxPrice;
        }

        public void setMaxPrice(int maxPrice) {
            this.maxPrice = maxPrice;
        }
    }

    public RangeSliderCustomValidation() {
        // tag::snippet[]
        RangeSlider rangeSlider = new RangeSlider("Price Range", 0, 1000,
                new RangeSliderValue(0, 1000));
        rangeSlider.setStep(50);
        rangeSlider.setMinMaxVisible(true);

        Binder<PriceFilter> binder = new Binder<>();
        binder.forField(rangeSlider)
                .withValidator(
                        value -> value.end() - value.start() >= 200,
                        "Price range must span at least $200")
                .bind(
                        product -> {
                            return new RangeSliderValue(
                                    product.getMinPrice(),
                                    product.getMaxPrice());
                        },
                        (product, value) -> {
                            product.setMinPrice((int) value.start());
                            product.setMaxPrice((int) value.end());
                        });

        binder.setBean(new PriceFilter());

        add(rangeSlider);
        // end::snippet[]
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<RangeSliderCustomValidation> { // hidden-source-line
    } // hidden-source-line
}
