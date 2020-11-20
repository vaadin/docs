package com.vaadin.demo.component.scroller;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.Scroller;
import com.vaadin.flow.router.Route;

@Route("scroller-mobile")
public class ScrollerMobile extends Div {

  public ScrollerMobile() {
    setWidth("300px");

    // Header
    Paragraph header = new Paragraph("Create new...");
    header.getStyle().set("font-family", "var(--lumo-font-family)");
    header.getStyle().set("font-size", "var(--lumo-font-size-l)");
    add(header);

    // tag::snippet[]
    Scroller scroller = new Scroller();
    scroller.setScrollDirection(Scroller.ScrollDirection.HORIZONTAL);

    scroller.setWidth("300px");
    scroller.getStyle().set("padding", "var(--lumo-space-m)");

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

    HorizontalLayout container = new HorizontalLayout();
    container.setWidth("max-content");
    container.setSpacing(true);

    container.add(auditBtn, reportBtn, dashboardBtn, invoiceBtn);

    scroller.setContent(container);

    add(scroller);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<ScrollerMobile> { // hidden-full-source-line
  } // hidden-full-source-line
}
