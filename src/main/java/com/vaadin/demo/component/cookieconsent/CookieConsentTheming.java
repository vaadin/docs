package com.vaadin.demo.component.cookieconsent;

import com.vaadin.flow.component.cookieconsent.CookieConsent;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("cookie-consent-theming")
public class CookieConsentTheming extends Div {

    public CookieConsentTheming() {
        // tag::snippet[]
        CookieConsent cookieConsent = new CookieConsent();

        add(cookieConsent);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<CookieConsentTheming> { // hidden-full-source-line
    } // hidden-full-source-line
}
