package com.vaadin.flow.tutorial.portletsupport;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.portal.VaadinPortlet;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("portlet-support/portlet-02-creating-vaadin-portlets.asciidoc")
public class CreatingVaadinPortlets {
    public class MyPortlet extends VaadinPortlet<MainView> {

    }

    public class MainView extends VerticalLayout {

        public MainView() {
            Button button = new Button("Click me",
                    event -> Notification.show("Clicked!"));
            add(button);
        }
    }
}
