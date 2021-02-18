package com.vaadin.demo.flow.application.mainview;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.RouteAlias;

// tag::route[]
@Route(value = "hello", layout = MainView.class)
// end::route[]

// tag::pagetitle[]
@PageTitle("Hello World")
// end::pagetitle[]

// tag::styling[]
@CssImport("./styles/views/helloworld/hello-world-view.css")
// end::styling[]

// tag::default[]
@RouteAlias(value = "", layout = MainView.class)
// end::default[]

// tag::snippet[]
public class HelloWorldView extends HorizontalLayout {
    private TextField name;
    private Button sayHello;

    public HelloWorldView() {
        setId("hello-world-view");
        name = new TextField("Your name");
        sayHello = new Button("Say hello");
        add(name, sayHello);
        setVerticalComponentAlignment(Alignment.END, name, sayHello);
        sayHello.addClickListener(e -> {
            Notification.show("Hello " + name.getValue());
        });
    }

}
// end::snippet[]
