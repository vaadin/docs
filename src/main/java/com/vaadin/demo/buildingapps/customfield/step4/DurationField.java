/* // hidden-source-line
package com.mydomain.myproject.ui.component;
*/ // hidden-source-line
package com.vaadin.demo.buildingapps.customfield.step4; // hidden-source-line

import com.vaadin.flow.component.customfield.CustomField;
import com.vaadin.flow.component.html.NativeLabel;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.theme.lumo.LumoUtility;

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
        var label = new NativeLabel("hours");
        label.addClassName(LumoUtility.Padding.Left.SMALL);
        return label;
    }

    private NativeLabel createMinutesLabel() {
        var label = new NativeLabel("minutes");
        label.addClassName(LumoUtility.Padding.Left.SMALL);
        return label;
    }

    private IntegerField createHoursField() {
        var hours = new IntegerField();
        // tag::hoursmin[]
        hours.setMin(0);
        // end::hoursmin[]
        hours.setWidth("45px");

        return hours;
    }

    private IntegerField createMinutesField() {
        var minutes = new IntegerField();
        // tag::minutesrange[]
        minutes.setMax(59);
        minutes.setMin(0);
        // end::minutesrange[]
        minutes.setWidth("45px");
        minutes.setStep(MINUTES_STEP_INTERVAL);

        return minutes;
    }

    private Span createAndSpan() {
        var andSpan = new Span("and");
        andSpan.addClassNames(LumoUtility.Padding.Left.SMALL,
                LumoUtility.Padding.Right.SMALL);
        return andSpan;
    }

    @Override
    protected Duration generateModelValue() {
        if (hours.getValue() == null || minutes.getValue() == null) {
            // If any of the fields are empty, we do not have enough to generate
            // a value.
            return null;
        }

        if (hours.isInvalid() || minutes.isInvalid()) {
            // If any of the fields are invalid, we can not use it to generate a
            // value.
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

    // tag::setinvalid[]
    @Override
    public void setInvalid(boolean invalid) {
        super.setInvalid(invalid);
        hours.setInvalid(invalid);
        minutes.setInvalid(invalid);
    }
    // end::setinvalid[]

    @Override
    public void focus() {
        // Make sure component focus targets the hours field.
        hours.focus();
    }
}
