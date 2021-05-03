package com.vaadin.demo.component.scroller;

import com.vaadin.demo.DemoExporter;
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
    setMaxWidth("100%");
    setWidth("360px");
    getStyle().set("border", "1px solid var(--lumo-contrast-20pct)");

    // Header
    H2 createNewTitle = new H2("Create new...");
    createNewTitle.getStyle()
            .set("margin-left", "var(--lumo-space-m)")
            .set("margin-right", "var(--lumo-space-m)");
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

    HorizontalLayout buttons = new HorizontalLayout(auditBtn, reportBtn, dashboardBtn, invoiceBtn);
    buttons.setPadding(true);
    buttons.getStyle().set("display", "inline-flex");

    scroller.setContent(buttons);
    add(scroller);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<ScrollerMobile> { // hidden-source-line
  } // hidden-source-line
}
