/* // hidden-source-line
package com.mydomain.myproject.ui.component;
*/ // hidden-source-line
package com.vaadin.demo.buildingapps.customfield.step2; // hidden-source-line

import com.vaadin.flow.component.customfield.CustomField;
import com.vaadin.flow.component.html.NativeLabel;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.textfield.IntegerField;

import java.time.Duration;

public class DurationField extends CustomField<Duration> {

    private static final long MINUTES_IN_HOUR = 60;
    private static final int MINUTES_STEP_INTERVAL = 15;

    private final NativeLabel hoursLabel;
    private final NativeLabel minutesLabel;
    private final IntegerField hours;
    private final IntegerField minutes;
    private final Span and;

    public DurationField() {
        hoursLabel = createHoursLabel();
        minutesLabel = createMinutesLabel();
        hours = createHoursField();
        minutes = createMinutesField();
        and = createAndSpan();

        add(hours, hoursLabel, and, minutes, minutesLabel);
    }

    private NativeLabel createHoursLabel() {
        return new NativeLabel("hours");
    }

    private NativeLabel createMinutesLabel() {
        return new NativeLabel("minutes");
    }

    private IntegerField createHoursField() {
        var hours = new IntegerField();
        hours.setWidth("45px");

        return hours;
    }

    private IntegerField createMinutesField() {
        var minutes = new IntegerField();
        minutes.setWidth("45px");
        minutes.setStep(MINUTES_STEP_INTERVAL);

        return minutes;
    }

    private Span createAndSpan() {
        return new Span("and");
    }

    @Override
    protected Duration generateModelValue() {
        if (hours.getValue() == null || minutes.getValue() == null) {
            // If any of the fields are empty, we do not have enough to generate
            // a value.
            return null;
        }

        var hourMinutes = MINUTES_IN_HOUR * hours.getValue();
        return Duration.ofMinutes(hourMinutes + minutes.getValue());
    }

    @Override
    protected void setPresentationValue(Duration newPresentationValue) {
        if (newPresentationValue == null) {
            hours.clear();
            minutes.clear();
        } else {
            hours.setValue((int) newPresentationValue.toHours());
            minutes.setValue(newPresentationValue.toMinutesPart());
        }
    }

    @Override
    public void focus() {
        // Make sure component focus targets the hours field.
        hours.focus();
    }
}
