package com.vaadin.demo.component.dashboard;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.dashboard.Dashboard;
import com.vaadin.flow.component.dashboard.DashboardWidget;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("dashboard-basic")
public class DashboardBasic extends Div {

    public DashboardBasic() {
        // tag::snippet[]
        Dashboard dashboard = new Dashboard();
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

        DashboardWidget visitorsByCountry = new DashboardWidget("Visitors by country");
        visitorsByCountry.setContent(createWidgetContent());
        visitorsByCountry.setRowspan(2);
        dashboard.add(visitorsByCountry);

        DashboardWidget browserDistribution = new DashboardWidget("Browsers");
        browserDistribution.setContent(createWidgetContent());
        dashboard.add(browserDistribution);

        DashboardWidget catImage = new DashboardWidget("A kittykat!");
        catImage.setContent(createWidgetContent());
        dashboard.add(catImage);

        DashboardWidget visitorsByBrowser = new DashboardWidget("Visitors by browser");
        visitorsByBrowser.setContent(createWidgetContent());
        visitorsByBrowser.setColspan(2);
        dashboard.add(visitorsByBrowser);

        add(dashboard);
        // end::snippet[]
    }

    private Div createWidgetContent() {
        Div content = new Div();
        content.setClassName("dashboard-widget-content");
        return content;
    }

    public static class Exporter extends DemoExporter<DashboardBasic> { // hidden-source-line
    } // hidden-source-line
}
