package com.vaadin.demo.component.scroller;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.Unit;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Footer;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.orderedlayout.Scroller;
import com.vaadin.flow.component.orderedlayout.ScrollerVariant;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

@Route("scroller-overflow-indicators")
public class ScrollerOverflowIndicators extends VerticalLayout {

    public ScrollerOverflowIndicators() {
        getStyle().set("border", "solid 1px var(--vaadin-border-color)");
        setAlignItems(Alignment.STRETCH);
        setHeight(400, Unit.PIXELS);
        setMaxWidth(100, Unit.PERCENTAGE);
        setPadding(false);
        setSpacing(false);
        setWidth(360, Unit.PIXELS);

        // Header
        H2 createYourAccount = new H2("Create your account");
        createYourAccount.getStyle().set("padding", "1rem").set("font-size",
                "1.375rem");
        add(createYourAccount);

        // tag::snippet[]
        TextField firstName = new TextField("First name");
        TextField lastName = new TextField("Last name");
        EmailField email = new EmailField("Email");
        TextField phoneNumber = new TextField("Phone number");
        TextField address = new TextField("Address");
        TextField city = new TextField("City");
        ComboBox<String> state = new ComboBox<>("State");
        TextField zipCode = new TextField("Zip code");
        ComboBox<String> country = new ComboBox<>("Country");

        Div div = new Div(firstName, lastName, email, phoneNumber, address,
                city, state, zipCode, country);
        div.getStyle().set("display", "flex").set("flex-direction", "column")
                .set("padding", "0 1rem 1rem");

        Scroller scroller = new Scroller(div);
        scroller.addThemeVariants(ScrollerVariant.LUMO_OVERFLOW_INDICATORS);
        scroller.setScrollDirection(Scroller.ScrollDirection.VERTICAL);
        add(scroller);
        // end::snippet[]

        // Footer
        Button next = new Button("Next");
        next.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        Button cancel = new Button("Cancel");
        cancel.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

        Footer footer = new Footer(next, cancel);
        footer.getStyle().set("display", "flex").set("gap", "0.5rem")
                .set("padding", "0.5rem 1rem");
        add(footer);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<ScrollerOverflowIndicators> { // hidden-source-line
    } // hidden-source-line
}
