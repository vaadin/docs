package com.vaadin.demo.flow.advanced.bootstrap;

import com.vaadin.flow.component.PushConfiguration;
import com.vaadin.flow.component.ReconnectDialogConfiguration;
import com.vaadin.flow.component.page.LoadingIndicatorConfiguration;
import com.vaadin.flow.server.ServiceInitEvent;
import com.vaadin.flow.server.VaadinServiceInitListener;
import com.vaadin.flow.shared.communication.PushMode;

public class ServiceListener implements VaadinServiceInitListener{

    @Override
    public void serviceInit(ServiceInitEvent event) {
        event.getSource().addUIInitListener(uiInitEvent -> {
            LoadingIndicatorConfiguration indicator = uiInitEvent.getUI().getLoadingIndicatorConfiguration();
            indicator.setApplyDefaultTheme(false);
            indicator.setSecondDelay(700000);

            PushConfiguration push = uiInitEvent.getUI().getPushConfiguration();
            push.setPushMode(PushMode.AUTOMATIC);
            
            ReconnectDialogConfiguration dialog = uiInitEvent.getUI().getReconnectDialogConfiguration();
            dialog.setDialogText("reconnecting...");
        });
    }
}