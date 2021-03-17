package com.vaadin.demo.flow.application.mainview;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.PageTitle;

//@Route(value = "about", layout = MainView.class)
@com.vaadin.flow.router.Route(value = "about", layout = MainView.class)
@PageTitle("About")
public class AboutView extends Div {

    public AboutView() {
        setId("about-view");
        add(new Text("Content placeholder"));
    }

}
