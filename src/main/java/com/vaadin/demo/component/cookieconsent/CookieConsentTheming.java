package com.vaadin.demo.component.cookieconsent;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.cookieconsent.CookieConsent;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("cookie-consent-theming")
public class CookieConsentTheming extends Div {

    public CookieConsentTheming() {
        // tag::snippet[]
        UI.getCurrent().getElement().getClassList().add("cookie-consent-theming");

        CookieConsent cookieConsent = new CookieConsent();
        add(cookieConsent);
        // end::snippet[]
    }
    public static class Exporter extends DemoExporter<CookieConsentTheming> {} // hidden-source-line
}
