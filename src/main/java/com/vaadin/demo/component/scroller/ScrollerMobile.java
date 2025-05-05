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
import com.vaadin.flow.theme.lumo.LumoUtility;

@Route("scroller-mobile")
public class ScrollerMobile extends Section {

    public ScrollerMobile() {
        addClassNames(LumoUtility.Border.ALL, LumoUtility.BorderColor.CONTRAST_20);
        setMaxWidth(100, Unit.PERCENTAGE);
        setWidth(360, Unit.PIXELS);

        // Header
        H2 createNewTitle = new H2("Create new...");
        createNewTitle.addClassNames(LumoUtility.FontSize.XLARGE, LumoUtility.Padding.Top.MEDIUM,
                LumoUtility.Padding.Horizontal.MEDIUM);
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
        buttons.addClassName(LumoUtility.Display.INLINE_FLEX);
        buttons.setPadding(true);

        scroller.setContent(buttons);
        add(scroller);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<ScrollerMobile> { // hidden-source-line
    } // hidden-source-line
}
