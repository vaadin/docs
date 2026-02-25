package com.vaadin.demo.component.map;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.map.Map;
import com.vaadin.flow.component.map.configuration.controls.ScaleControl;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.slider.Slider;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.signals.Signal;
import com.vaadin.flow.signals.local.ValueSignal;

@Route("map-scale-control")
public class MapScaleControl extends Div {

    public MapScaleControl() {
        Map map = new Map();
        add(map);

        // tag::snippet[]
        ValueSignal<ScaleControl.Unit> units = new ValueSignal<>(
                ScaleControl.Unit.METRIC);
        ValueSignal<Boolean> showAsBar = new ValueSignal<>(false);
        ValueSignal<Double> barSteps = new ValueSignal<>(4d);
        ValueSignal<Boolean> showRatio = new ValueSignal<>(false);

        ScaleControl scaleControl = map.getControls().getScale();
        scaleControl.setVisible(true);
        scaleControl.setMinWidth(175);

        // Update control when data changes
        Signal.effect(map, () -> {
            scaleControl.setUnits(units.get());
            scaleControl.setDisplayMode(
                    showAsBar.get() ? ScaleControl.DisplayMode.BAR
                            : ScaleControl.DisplayMode.LINE);
            scaleControl.setScaleBarSteps(barSteps.get().intValue());
            scaleControl.setScaleBarRatioVisible(showRatio.get());
        });

        // Configure unit of measurement
        Select<ScaleControl.Unit> unitSelect = new Select<>("Units");
        unitSelect.setItems(ScaleControl.Unit.values());
        unitSelect.bindValue(units, units::set);

        // Toggle bar mode
        Checkbox barCheckbox = new Checkbox("Display as bar");
        barCheckbox.bindValue(showAsBar, showAsBar::set);

        // Configure number of bar segments
        Slider stepsSlider = new Slider("Bar steps", 2, 8);
        stepsSlider.setValue(4d);
        stepsSlider.setStep(2);
        stepsSlider.setValueChangeMode(ValueChangeMode.EAGER);
        stepsSlider.bindEnabled(showAsBar);
        stepsSlider.bindValue(barSteps, barSteps::set);

        // Toggle ratio text visibility
        Checkbox ratioTextCheckbox = new Checkbox("Show ratio");
        ratioTextCheckbox.bindEnabled(showAsBar);
        ratioTextCheckbox.bindValue(showRatio, showRatio::set);
        // end::snippet[]

        HorizontalLayout layout = new HorizontalLayout(unitSelect, barCheckbox,
                stepsSlider, ratioTextCheckbox);
        layout.setWrap(true);
        layout.setAlignItems(FlexComponent.Alignment.BASELINE);
        add(layout);
    }

    public static class Exporter extends DemoExporter<MapScaleControl> { // hidden-source-line
    } // hidden-source-line
}
