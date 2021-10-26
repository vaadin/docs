package com.vaadin.demo.component.cookieconsent;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.cookieconsent.CookieConsent;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("cookie-consent-localization")
public class CookieConsentLocalization extends Div {

    public CookieConsentLocalization() {
        // tag::snippet[]
        CookieConsent cookieConsent = new CookieConsent();
        cookieConsent.setMessage("Tämä sivusto käyttää evästeitä parhaan kokemuksen tarjoamiseksi");
        cookieConsent.setDismissLabel("Selvä");
        cookieConsent.setLearnMoreLabel("Lue lisää");
        cookieConsent.setLearnMoreLink("https://vaadin.com/terms-of-service");
        add(cookieConsent);
        // end::snippet[]
    }
    public static class Exporter extends DemoExporter<CookieConsentLocalization> {} // hidden-source-line
}
