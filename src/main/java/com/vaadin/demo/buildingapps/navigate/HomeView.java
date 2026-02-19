package com.vaadin.demo.buildingapps.navigate;

// tag::snippet[]
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLink;

@Route("building-apps/navigate/home")
public class HomeView extends VerticalLayout {

    HomeView() {
        add(new RouterLink("Go to About (link)", AboutView.class));
        add(new Button("Go to About (button)", e -> AboutView.showView()));
    }
}
// end::snippet[]
