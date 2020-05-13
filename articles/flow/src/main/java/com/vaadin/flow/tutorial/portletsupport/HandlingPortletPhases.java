package com.vaadin.flow.tutorial.portletsupport;

import javax.portlet.PortletMode;
import javax.portlet.WindowState;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.portal.PortletView;
import com.vaadin.flow.portal.PortletViewContext;
import com.vaadin.flow.portal.VaadinPortlet;
import com.vaadin.flow.portal.lifecycle.PortletModeEvent;
import com.vaadin.flow.portal.lifecycle.PortletModeHandler;
import com.vaadin.flow.portal.lifecycle.WindowStateEvent;
import com.vaadin.flow.portal.lifecycle.WindowStateHandler;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("portlet-support/portlet-03-handling-portlet-phases.asciidoc")
public class HandlingPortletPhases {
    public class PortletModeListenerDemo {
        public class MyPortletView extends Div implements PortletView {

            @Override
            public void onPortletViewContextInit(PortletViewContext context) {
                context.addPortletModeChangeListener(event -> showHelpText(event.isHelpMode()));
                // for the current portlet that is processing requests
                context.setPortletMode(PortletMode.EDIT);
            }
        }
    }

    public class WindowStateListenerDemo {

        public class MyPortletView extends Div implements PortletView {
            @Override
            public void onPortletViewContextInit(PortletViewContext context) {
                context.addWindowStateChangeListener(event -> showDetailsField(event.isMaximized()));
                // for the current portlet that is processing requests
                context.setWindowState(WindowState.MAXIMIZED);
            }
        }
    }

    public class MyPortlet extends VaadinPortlet<MyView> {

    }

    public void showHelpText(boolean helpMode) {

    }

    public void showDetailsField(boolean maximized) {

    }

    public class MyView extends Div implements PortletView {

        private Paragraph stateInformation;

        @Override
        public void onPortletViewContextInit(PortletViewContext context) {
            context.addWindowStateChangeListener(event -> stateInformation
                    .setText("Window state changed to " + event.getWindowState()));
            context.addPortletModeChangeListener(event -> stateInformation
                    .setText("Portlet mode changed to " + event.getPortletMode()));

            stateInformation = new Paragraph("Use the portlet controls or the "
                    + "buttons below to change the portlet's state!");

            Button maximizeButton = new Button("Maximize", event -> context.setWindowState(WindowState.MAXIMIZED));

            Button helpButton = new Button("Show help", event -> context.setPortletMode(PortletMode.HELP));

            add(stateInformation, maximizeButton, helpButton);
        }
    }

    public class HandlersDemo {
        public class MyView extends Div
                implements PortletModeHandler, WindowStateHandler {

            private Paragraph stateInformation = new Paragraph();

            public MyView() {
                add(stateInformation);
            }

            @Override
            public void portletModeChange(PortletModeEvent event) {
                stateInformation
                        .setText("Portlet mode changed to " + event.getPortletMode());
            }

            @Override
            public void windowStateChange(WindowStateEvent event) {
                stateInformation
                        .setText("Window state changed to " + event.getWindowState());
            }
        }
    }

    public class RenderingInMinimizedStateDemo {
        public class MyPortlet extends VaadinPortlet<MyView> {
            @Override
            protected boolean shouldRenderMinimized() {
                return true;
            }
        }

        public class MyView extends Div implements PortletView {
            private VerticalLayout normalLayout = new VerticalLayout();
            private VerticalLayout minimizedLayout = new VerticalLayout();

            @Override
            public void onPortletViewContextInit(PortletViewContext context) {
                context.addWindowStateChangeListener(this::handleWindowStateChanged);

                // Initialize layouts here

                minimizedLayout.setVisible(false);
                add(normalLayout, minimizedLayout);
            }

            private void handleWindowStateChanged(WindowStateEvent event) {
                boolean isMinimized = WindowState.MINIMIZED.equals(event.getWindowState());
                minimizedLayout.setVisible(isMinimized);
                normalLayout.setVisible(!isMinimized);
            }
        }
    }
}
