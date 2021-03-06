package com.vaadin.flow.tutorial.theme;

import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.dependency.StyleSheet;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("../../themes/importing-style-sheets.asciidoc")
public class ImportingStyleSheets {

    @Route(value = "")

    // tag::cssimport[]
    // Import a style sheet into the global scope
    @CssImport("./styles/shared-styles.css")
    // end::cssimport[]

    @CssImport(value = "./styles/shared-styles.css", include = "common-styles")

    // tag::cssimport-id[]
    @CssImport(value = "./styles/shared-typography.css",
               id = "shared-typography")
    // end::cssimport-id[]

    // tag::cssimport-include[]
    @CssImport(value = "./styles/shared-styles.css",
               include = "shared-typography")
    // end::cssimport-include[]

    // tag::cssimport-themefor[]

    // Import a style sheet into the local scope of the TextField component
    @CssImport(value = "./styles/text-field.css",
               themeFor = "vaadin-text-field")
    // end::cssimport-themefor[]

    // tag::cssimport-themefor-multiple[]
    @CssImport(value = "./styles/shared-overlays.css",
               themeFor = "vaadin-select-overlay vaadin-combo-box-overlay")
    // end::cssimport-themefor-multiple[]

    // tag::cssimport-themefor-include[]
    @CssImport(value = "./styles/shared-styles.css",
               include = "shared-typography",
               themeFor = "vaadin-confirm-dialog-overlay")
    // end::cssimport-themefor-include[]

    // tag::stylesheet[]

    // Link to external style sheets
    @StyleSheet("context://custom-font.css")
    @StyleSheet("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css")
    // end::stylesheet[]

    // tag::app-class[]
    public class MyApplication extends Div {
    }
    // end::app-class[]

}
