package com.vaadin.flow.tutorial.migration;

import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.ServiceInitEvent;
import com.vaadin.flow.server.VaadinServiceInitListener;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("migration/8-migration-example.asciidoc")
public class Example {

    @Route("")
    @PageTitle("My")
    public class HelloWorldPage extends Div {
        public HelloWorldPage() {
            this.add(new H1("Hello World!"));
        }
    }

    public class BookstoreInitListener implements VaadinServiceInitListener {
        @Override
        public void serviceInit(ServiceInitEvent initEvent) {
            initEvent.getSource().addUIInitListener(uiInitEvent -> {
                uiInitEvent.getUI().addBeforeEnterListener(enterEvent -> {
                    // Controlling access can be done here.
                });
            });
        }
    }

    public class LoginScreen extends FlexLayout {
        public LoginScreen() {
            FormLayout loginForm = new FormLayout();

            loginForm.getElement()
                    .addEventListener("keypress", event -> login())
                    .setFilter("event.key == 'Enter'");
        }

        private void login() {

        }
    }
}
