package com.vaadin.demo.component.dashboard;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.dashboard.Dashboard;
import com.vaadin.flow.component.dashboard.DashboardWidget;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.router.Route;

@Route("dashboard-announcements")
public class DashboardAnnouncements extends Div {

    public DashboardAnnouncements() {
        add(new Paragraph("Live announcement:"));

        Dashboard dashboard = new Dashboard();
        dashboard.setEditable(true);
        dashboard.setMinimumColumnWidth("150px");
        dashboard.setMaximumColumnCount(3);

        DashboardWidget visitors = new DashboardWidget("Visitors");
        visitors.setContent(createWidgetContent());
        dashboard.add(visitors);

        DashboardWidget downloads = new DashboardWidget("Downloads");
        downloads.setContent(createWidgetContent());
        dashboard.add(downloads);

        DashboardWidget conversions = new DashboardWidget("Conversions");
        conversions.setContent(createWidgetContent());
        dashboard.add(conversions);

        DashboardWidget visitorsByCountry = new DashboardWidget(
                "Visitors by country");
        visitorsByCountry.setContent(createWidgetContent());
        visitorsByCountry.setRowspan(2);
        dashboard.add(visitorsByCountry);

        DashboardWidget browserDistribution = new DashboardWidget("Browsers");
        browserDistribution.setContent(createWidgetContent());
        dashboard.add(browserDistribution);

        DashboardWidget catImage = new DashboardWidget("A kittykat!");
        catImage.setContent(createWidgetContent());
        dashboard.add(catImage);

        DashboardWidget visitorsByBrowser = new DashboardWidget(
                "Visitors by browser");
        visitorsByBrowser.setContent(createWidgetContent());
        visitorsByBrowser.setColspan(2);
        dashboard.add(visitorsByBrowser);

        // tag::snippet[]
        // Live region for screen reader announcements. Changing its text
        // content will result in a new announcement. This element is only
        // visible for demonstration purposes. In your application you should
        // visually hide it using CSS by applying a corresponding class name,
        // like "screen-reader-only", as shown in the attached CSS example file:
        // liveRegion.addClassName("screen-reader-only");
        Div liveRegion = new Div();
        liveRegion.getElement().setAttribute("aria-live", "polite");
        add(liveRegion);

        // This event is fired when the user starts or stops editing a widget
        dashboard.addItemSelectedChangedListener(event -> {
            String title = ((DashboardWidget) event.getItem()).getTitle();
            String selected = event.isSelected() ? "selected" : "deselected";

            liveRegion.setText("Widget " + title + " " + selected);
        });

        // This event is fired when the user enters or exits move mode
        dashboard.addItemMoveModeChangedListener(event -> {
            if (event.isMoveMode()) {
                liveRegion.setText("Entered move mode");
            } else {
                liveRegion.setText("Exited move mode");
            }
        });

        // This event is fired when the user enters or exits resize mode
        dashboard.addItemResizeModeChangedListener(event -> {
            if (event.isResizeMode()) {
                liveRegion.setText("Entered resize mode");
            } else {
                liveRegion.setText("Exited resize mode");
            }
        });

        // This event is fired when the user moves a widget
        dashboard.addItemMovedListener(event -> {
            int position = event.getItems().indexOf(event.getItem()) + 1;
            int total = event.getItems().size();
            String title = ((DashboardWidget) event.getItem()).getTitle();

            liveRegion.setText("Moved widget " + title + " to position "
                    + position + " of " + total);
        });

        // This event is fired when the user resizes a widget
        dashboard.addItemResizedListener(event -> {
            int colspan = event.getItem().getColspan();
            int rowspan = event.getItem().getRowspan();
            String title = event.getItem().getTitle();

            liveRegion.setText("Resized widget " + title + " to " + colspan
                    + " columns, " + rowspan + " rows");
        });

        // This event is fired when the user removes a widget
        dashboard.addItemRemovedListener(event -> {
            String title = ((DashboardWidget) event.getItem()).getTitle();

            liveRegion.setText("Removed widget " + title);
        });
        // end::snippet[]

        add(dashboard);
    }

    private Div createWidgetContent() {
        Div content = new Div();
        content.setClassName("dashboard-widget-content");
        return content;
    }

    public static class Exporter extends DemoExporter<DashboardAnnouncements> { // hidden-source-line
    } // hidden-source-line
}
