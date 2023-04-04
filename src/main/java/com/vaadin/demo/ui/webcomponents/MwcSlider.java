package com.vaadin.demo.ui.webcomponents;

import com.vaadin.flow.component.*;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.shared.Registration;

// tag::class[]
@Tag("mwc-slider")
@NpmPackage(value = "@material/mwc-slider",
        version = "0.27.0")
@JsModule("@material/mwc-slider/slider.js")
public class MwcSlider extends AbstractSinglePropertyField<MwcSlider, Integer> {

    private static final PropertyDescriptor<Boolean, Boolean> discreteProperty = PropertyDescriptors.propertyWithDefault("discrete", false);

    public MwcSlider() {
        super("value", 0, false);
    }

    @Synchronize("change") // synchronize value onChange event
    @Override
    public Integer getValue() {
        return super.getValue();
    }

    public Registration addClickListener(ComponentEventListener<ClickEvent> listener) {
        return addListener(ClickEvent.class, listener);
    }

    public void setDiscrete(boolean discrete) {
        discreteProperty.set(this, discrete);
    }
    public boolean isDiscrete() {
        return discreteProperty.get(this);
    }

    public void layout(boolean skipUpdateUI) {
        getElement().callJsFunction("layout", skipUpdateUI);
    }

    @DomEvent("click")
    public static class ClickEvent extends ComponentEvent<MwcSlider> {

        private int x, y;

        public ClickEvent(MwcSlider source,
                          boolean fromClient,
                          @EventData("event.offsetX") int x,
                          @EventData("event.offsetY") int y) {
            super(source, fromClient);
            this.x = x;
            this.y = y;
        }

        public int getX() {
            return x;
        }

        public int getY() {
            return y;
        }

    }

}
// end::class[]