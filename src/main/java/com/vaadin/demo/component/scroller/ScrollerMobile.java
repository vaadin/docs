package com.vaadin.demo.component.scroller;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.Unit;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Section;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.Scroller;
import com.vaadin.flow.router.Route;

@Route("scroller-mobile")
public class ScrollerMobile extends Section {

    public ScrollerMobile() {
        getStyle().set("border", "solid 1px var(--vaadin-border-color)");
        setMaxWidth(100, Unit.PERCENTAGE);
        setWidth(360, Unit.PIXELS);

        // Header
        H2 createNewTitle = new H2("Create new...");
        createNewTitle.getStyle().set("padding", "1rem 1rem 0").set("font-size",
                "1.375rem");
        add(createNewTitle);

        // tag::snippet[]
        Scroller scroller = new Scroller();
        scroller.setScrollDirection(Scroller.ScrollDirection.HORIZONTAL);

        Button auditBtn = new Button("Audit");
        auditBtn.setIcon(new Icon(VaadinIcon.CLIPBOARD_CHECK));
        auditBtn.setHeight("100px");

        Button reportBtn = new Button("Report");
        reportBtn.setIcon(new Icon(VaadinIcon.BOOK_DOLLAR));
        reportBtn.setHeight("100px");

        Button dashboardBtn = new Button("Dashboard");
        dashboardBtn.setIcon(new Icon(VaadinIcon.LINE_CHART));
        dashboardBtn.setHeight("100px");

        Button invoiceBtn = new Button("Invoice");
        invoiceBtn.setIcon(new Icon(VaadinIcon.INVOICE));
        invoiceBtn.setHeight("100px");

        HorizontalLayout buttons = new HorizontalLayout(auditBtn, reportBtn,
                dashboardBtn, invoiceBtn);
        buttons.getStyle().set("display", "inline-flex");
        buttons.setPadding(true);

        scroller.setContent(buttons);
        add(scroller);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<ScrollerMobile> { // hidden-source-line
    } // hidden-source-line
}
