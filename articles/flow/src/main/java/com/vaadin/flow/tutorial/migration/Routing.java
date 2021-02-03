package com.vaadin.flow.tutorial.migration;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("migration/4-routing-navigation.asciidoc")
public class Routing {

    @Route(value = "company", layout = MainLayout.class)
    public class CompanyView extends Composite<Div> {
        // Implementation omitted
    }

    class MainLayout extends Component implements RouterLayout {

    }

}
