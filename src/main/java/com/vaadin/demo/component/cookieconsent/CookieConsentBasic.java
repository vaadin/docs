package com.vaadin.demo.component.cookieconsent;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.cookieconsent.CookieConsent;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("cookie-consent-basic")
public class CookieConsentBasic extends Div {

    public CookieConsentBasic() {
        // tag::snippet[]
        CookieConsent cookieConsent = new CookieConsent();

        add(cookieConsent);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<CookieConsentBasic> { // hidden-source-line
    } // hidden-source-line
}
