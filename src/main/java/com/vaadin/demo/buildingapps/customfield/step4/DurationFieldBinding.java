/* // hidden-source-line
package com.mydomain.myproject.ui.view;
*/ // hidden-source-line
package com.vaadin.demo.buildingapps.customfield.step4; // hidden-source-line

/* // hidden-source-line
import com.mydomain.myproject.data.DurationTutorialDTO;
import com.mydomain.myproject.ui.component.DurationField;
*/ // hidden-source-line
import com.vaadin.demo.buildingapps.customfield.data.DurationTutorialDTO; // hidden-source-line
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.binder.ValidationResult;

// The binding steps of the tutorial, each building on the previous one.
public class DurationFieldBinding {

    // tag::hoursinaweek[]
    private static final long HOURS_IN_A_WEEK = 24 * 7;
    // end::hoursinaweek[]

    void bind() {
        // @formatter:off hidden-source-line
        // tag::bind[]
        var durationField = new DurationField(); // Create our field
        durationField.setLabel("Duration");

        var binder = new Binder<DurationTutorialDTO>();
        binder.forField(durationField)
                .bind(DurationTutorialDTO::getDuration,
                        DurationTutorialDTO::setDuration);
        // end::bind[]
        // @formatter:on hidden-source-line
    }

    void bindAsRequired(DurationField durationField) {
        // @formatter:off hidden-source-line
        // tag::required[]
        var binder = new Binder<DurationTutorialDTO>();
        binder.forField(durationField)
                .asRequired("Please provide a valid duration.")
                .bind(DurationTutorialDTO::getDuration,
                        DurationTutorialDTO::setDuration);
        // end::required[]
        // @formatter:on hidden-source-line
    }

    void bindWithValidator(DurationField durationField,
            Binder<DurationTutorialDTO> binder) {
        // @formatter:off hidden-source-line
        // tag::validator[]
        binder.forField(durationField)
                .asRequired("Please provide a valid duration.")
                .withValidator((value, context) -> {
                    if (value.toHours() > HOURS_IN_A_WEEK) {
                        return ValidationResult.error("Duration cannot exceed "
                                + HOURS_IN_A_WEEK + " hours");
                    }
                    return ValidationResult.ok();
                })
                .bind(DurationTutorialDTO::getDuration,
                        DurationTutorialDTO::setDuration);
        // end::validator[]
        // @formatter:on hidden-source-line
    }
}
