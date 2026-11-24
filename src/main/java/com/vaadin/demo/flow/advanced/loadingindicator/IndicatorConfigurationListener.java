package com.vaadin.demo.flow.advanced.loadingindicator;

import com.vaadin.flow.component.ReconnectDialogConfiguration;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.page.LoadingIndicatorConfiguration;
import com.vaadin.flow.server.ServiceInitEvent;
import com.vaadin.flow.server.VaadinServiceInitListener;

// tag::snippet[]
public class IndicatorConfigurationListener
        implements VaadinServiceInitListener {

    @Override
    public void serviceInit(ServiceInitEvent event) {
        event.getSource().addUIInitListener(uiInitEvent -> {
            UI ui = uiInitEvent.getUI();

            LoadingIndicatorConfiguration loading = ui
                    .getLoadingIndicatorConfiguration();
            loading.setFirstDelay(300); // Milliseconds
            loading.setSecondDelay(1500);
            loading.setThirdDelay(5000);

            ReconnectDialogConfiguration reconnect = ui
                    .getReconnectDialogConfiguration();
            reconnect.setDialogText("Reconnecting...");
            reconnect.setDialogTextGaveUp("Offline");
        });
    }
}
// end::snippet[]
