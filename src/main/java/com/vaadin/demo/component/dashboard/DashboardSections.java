package com.vaadin.demo.component.dashboard;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.dashboard.Dashboard;
import com.vaadin.flow.component.dashboard.DashboardSection;
import com.vaadin.flow.component.dashboard.DashboardWidget;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("dashboard-sections")
public class DashboardSections extends Div {

    public DashboardSections() {
        Dashboard dashboard = new Dashboard();
        dashboard.setMinimumColumnWidth("150px");
        dashboard.setMaximumColumnCount(3);

        // tag::snippet[]
        DashboardSection statsSection = dashboard
                .addSection("Monthly Funnel Stats");

        DashboardWidget visitors = new DashboardWidget("Visitors");
        visitors.setContent(MockWidgets.createVisitorsWidget());
        statsSection.add(visitors);

        DashboardWidget downloads = new DashboardWidget("Downloads");
        downloads.setContent(MockWidgets.createDownloadsWidget());
        statsSection.add(downloads);

        DashboardWidget conversions = new DashboardWidget("Conversions");
        conversions.setContent(MockWidgets.createConversionsWidget());
        statsSection.add(conversions);
        // end::snippet[]

        DashboardSection detailsSection = dashboard
                .addSection("Visitor Details");
        DashboardWidget visitorsByCountry = new DashboardWidget(
                "Visitors by country");
        visitorsByCountry
                .setContent(MockWidgets.createVisitorsByCountryWidget());
        visitorsByCountry.setRowspan(2);
        detailsSection.add(visitorsByCountry);

        DashboardWidget browsers = new DashboardWidget("Browsers");
        browsers.setContent(MockWidgets.createBrowsersWidget());
        detailsSection.add(browsers);

        DashboardWidget trafficSources = new DashboardWidget("Traffic sources");
        trafficSources.setContent(MockWidgets.createTrafficSourcesWidget());
        detailsSection.add(trafficSources);

        DashboardWidget visitorsPerMonth = new DashboardWidget(
                "Visitors per month");
        visitorsPerMonth.setContent(MockWidgets.createVisitorsPerMonthWidget());
        visitorsPerMonth.setColspan(2);
        detailsSection.add(visitorsPerMonth);

        add(dashboard);
    }

    public static class Exporter extends DemoExporter<DashboardSections> { // hidden-source-line
    } // hidden-source-line
}
