package com.vaadin.demo.component.cookieconsent;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.charts.model.Label;
import com.vaadin.flow.component.contextmenu.ContextMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("cookie-consent-localization")
public class CookieConsentLocalization extends Div {

    public CookieConsentBasic() {
        // tag::snippet[]
        CookieConsent cookieConsent = new CookieConsent();

        add(cookieConsent);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<CookieConsentLocalization> { // hidden-full-source-line
    } // hidden-full-source-line
}
