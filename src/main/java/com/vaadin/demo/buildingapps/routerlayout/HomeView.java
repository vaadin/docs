package com.vaadin.demo.buildingapps.routerlayout;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Menu;
import com.vaadin.flow.router.Route;

// tag::snippet[]
@Route("building-apps/router-layout/home")
@Menu(title = "Home", icon = "vaadin:home")
public class HomeView extends VerticalLayout {

    HomeView() {
        add("This is the home view");
    }
}
// end::snippet[]
