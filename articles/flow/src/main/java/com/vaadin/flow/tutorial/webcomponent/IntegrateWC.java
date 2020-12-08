package com.vaadin.flow.tutorial.webcomponent;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("web-components/integrating-a-web-component.asciidoc")
public class IntegrateWC {
    @Tag("paper-slider")
    @NpmPackage(value = "@polymer/paper-slider", version = "3.0.1")
    @JsModule("@polymer/paper-slider/paper-slider.js")
    public class PaperSlider extends Component {
    }

    @Route("")
    public class DemoView extends VerticalLayout {
    }
}
