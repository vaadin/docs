/* // hidden-source-line
package com.mydomain.myproject.ui.view;
*/ // hidden-source-line
package com.vaadin.demo.buildingapps.customfield.step5; // hidden-source-line

/* // hidden-source-line
import com.mydomain.myproject.ui.component.DurationField;
import com.mydomain.myproject.ui.component.i18n.DurationFieldI18n;
*/ // hidden-source-line
import com.vaadin.demo.buildingapps.customfield.i18n.DurationFieldI18n; // hidden-source-line

public class DurationFieldLocalization {

    void localize() {
        // tag::localize[]
        var duration = new DurationField(); // Uses default labels initially
        // ...
        duration.setLabel("Ilgums"); // Localized label

        var i18n = new DurationFieldI18n(); // Localized to different language
        i18n.setHours("stundas");
        i18n.setMinutes("minūtes");
        i18n.setAnd("un");
        duration.setI18n(i18n);
        // end::localize[]
    }
}
