/* // hidden-source-line
package com.mydomain.myproject.ui.view;
*/ // hidden-source-line
package com.vaadin.demo.buildingapps.customfield.step2; // hidden-source-line

/* // hidden-source-line
import com.mydomain.myproject.ui.component.DurationField;
*/ // hidden-source-line
import com.vaadin.flow.component.html.Main;
import com.vaadin.flow.router.Route;

// @formatter:off hidden-source-line
@Route("building-apps/custom-field") // hidden-source-line
/* // hidden-source-line
@Route
*/ // hidden-source-line
// @formatter:on hidden-source-line
public final class MainView extends Main {
    MainView() {
        var duration = new DurationField();
        duration.setLabel("Duration");
        add(duration);
    }
}
