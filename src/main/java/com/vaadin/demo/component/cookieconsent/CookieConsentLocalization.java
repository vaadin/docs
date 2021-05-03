package com.vaadin.demo.component.cookieconsent;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.cookieconsent.CookieConsent;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("cookie-consent-localization")
public class CookieConsentLocalization extends Div {

    public CookieConsentLocalization() {
        // tag::snippet[]
        CookieConsent cookieConsent = new CookieConsent();

        add(cookieConsent);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<CookieConsentLocalization> { // hidden-source-line
    } // hidden-source-line
}
