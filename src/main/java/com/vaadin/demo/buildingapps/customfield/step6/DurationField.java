/* // hidden-source-line
package com.mydomain.myproject.ui.component;
*/ // hidden-source-line
package com.vaadin.demo.buildingapps.customfield.step6; // hidden-source-line

/* // hidden-source-line
import com.mydomain.myproject.ui.component.i18n.DurationFieldI18n;
*/ // hidden-source-line
import com.vaadin.demo.buildingapps.customfield.i18n.DurationFieldI18n; // hidden-source-line
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

    private DurationFieldI18n i18n;

    public DurationField() {
        this(new DurationFieldI18n());
    }

    public DurationField(DurationFieldI18n i18n) {
        this.i18n = i18n;

        hoursLabel = createHoursLabel();
        minutesLabel = createMinutesLabel();
        hours = createHoursField();
        minutes = createMinutesField();
        and = createAndSpan();

        updateAriaDescription();
        updateLabels();

        add(hours, hoursLabel, and, minutes, minutesLabel);
    }

    private NativeLabel createHoursLabel() {
        var label = new NativeLabel();
        label.addClassName(LumoUtility.Padding.Left.SMALL);
        return label;
    }

    private NativeLabel createMinutesLabel() {
        var label = new NativeLabel();
        label.addClassName(LumoUtility.Padding.Left.SMALL);
        return label;
    }

    private IntegerField createHoursField() {
        var hours = new IntegerField();
        hours.setMin(0);
        hours.setWidth("45px");

        // tag::valuechange[]
        hours.addValueChangeListener(e -> {
            updateAriaDescription();
        });
        // end::valuechange[]

        return hours;
    }

    private IntegerField createMinutesField() {
        var minutes = new IntegerField();
        minutes.setMax(59);
        minutes.setMin(0);
        minutes.setWidth("45px");
        minutes.setStep(MINUTES_STEP_INTERVAL);

        minutes.addValueChangeListener(e -> {
            updateAriaDescription();
        });

        return minutes;
    }

    private Span createAndSpan() {
        var andSpan = new Span();
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
        updateAriaDescription();
    }

    public DurationFieldI18n getI18n() {
        return i18n;
    }

    public void setI18n(DurationFieldI18n i18n) {
        this.i18n = i18n;
        updateLabels();
    }

    @Override
    public void setInvalid(boolean invalid) {
        super.setInvalid(invalid);
        hours.setInvalid(invalid);
        minutes.setInvalid(invalid);
    }

    // tag::ariadescription[]
    private void updateAriaDescription() {
        getElement().setAttribute("aria-description", valueAsString());
    }

    private String valueAsString() {
        if (hours.getValue() == null || minutes.getValue() == null) {
            return "";
        }

        return String.format("%d %s %s %d %s", hours.getValue(),
                i18n.getHours(), i18n.getAnd(), minutes.getValue(),
                i18n.getMinutes());
    }
    // end::ariadescription[]

    @Override
    public void focus() {
        // Make sure component focus targets the hours field.
        hours.focus();
    }

    // hidden-source-line: The updatelabels snippet leaves out the
    // hidden-source-line: updateAriaDescription() call; the tutorial
    // hidden-source-line: adds it later.
    // tag::updatelabels[]
    private void updateLabels() {
        hoursLabel.setText(i18n.getHours());
        minutesLabel.setText(i18n.getMinutes());
        and.setText(i18n.getAnd());
        hours.setAriaLabel(i18n.getHours());
        minutes.setAriaLabel(i18n.getMinutes());
        // end::updatelabels[]
        updateAriaDescription();
        // tag::updatelabels[]
    }
    // end::updatelabels[]
}
