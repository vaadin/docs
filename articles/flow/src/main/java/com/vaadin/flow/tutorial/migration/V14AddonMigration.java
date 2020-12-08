package com.vaadin.flow.tutorial.migration;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("v14-migration/v14-addon-guide.asciidoc")
public class V14AddonMigration {

    // other code omitted for clarity
    @NpmPackage(value = "@polymer/paper-slider", version = "3.0.1")
    @JsModule(value = "@polymer/paper-slider/paper-slider.js")
    public class PaperSlider extends Component { }

}
