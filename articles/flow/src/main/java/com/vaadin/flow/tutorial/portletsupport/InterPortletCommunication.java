package com.vaadin.flow.tutorial.portletsupport;

import java.util.Collections;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.portal.PortletView;
import com.vaadin.flow.portal.PortletViewContext;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("portlet-support/portlet-04-inter-portlet-communication.asciidoc")
public class InterPortletCommunication {
    public class FiringPortletView extends Div implements PortletView {

        private PortletViewContext portletContext;

        @Override
        public void onPortletViewContextInit(PortletViewContext context) {
            portletContext = context;
            Button button = new Button("Fire event", event -> portletContext
                    .fireEvent("my-ipc-event", Collections.emptyMap()));
        }
    }

    public class ReceivingPortletView extends Div
            implements PortletView {

        @Override
        public void onPortletViewContextInit(PortletViewContext context) {
            context.addEventChangeListener("my-ipc-event", event -> Notification
                    .show("Received '" + event.getEventName() + "' event!"));
        }
    }

}
