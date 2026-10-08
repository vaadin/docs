/* // hidden-source-line
package com.mydomain.myproject.ui.component.i18n;
*/ // hidden-source-line
package com.vaadin.demo.buildingapps.customfield.i18n; // hidden-source-line

import java.io.Serializable;

public class DurationFieldI18n implements Serializable {
    private String hours = "hours";
    private String minutes = "minutes";
    private String and = "and";

    public String getHours() {
        return hours;
    }

    public void setHours(String hours) {
        this.hours = hours;
    }

    public String getMinutes() {
        return minutes;
    }

    public void setMinutes(String minutes) {
        this.minutes = minutes;
    }

    public String getAnd() {
        return and;
    }

    public void setAnd(String and) {
        this.and = and;
    }
}
