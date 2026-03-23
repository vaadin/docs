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
        visitors.setContent(MockWidgets.createVisitorsWidget());
        dashboard.add(visitors);

        DashboardWidget downloads = new DashboardWidget("Downloads");
        downloads.setContent(MockWidgets.createDownloadsWidget());
        dashboard.add(downloads);

        DashboardWidget conversions = new DashboardWidget("Conversions");
        conversions.setContent(MockWidgets.createConversionsWidget());
        dashboard.add(conversions);

        DashboardWidget visitorsByCountry = new DashboardWidget(
                "Visitors by country");
        visitorsByCountry
                .setContent(MockWidgets.createVisitorsByCountryWidget());
        visitorsByCountry.setRowspan(2);
        dashboard.add(visitorsByCountry);

        DashboardWidget browsers = new DashboardWidget("Browsers");
        browsers.setContent(MockWidgets.createBrowsersWidget());
        dashboard.add(browsers);

        DashboardWidget trafficSources = new DashboardWidget("Traffic sources");
        trafficSources.setContent(MockWidgets.createTrafficSourcesWidget());
        dashboard.add(trafficSources);

        DashboardWidget visitorsPerMonth = new DashboardWidget(
                "Visitors per month");
        visitorsPerMonth.setContent(MockWidgets.createVisitorsPerMonthWidget());
        visitorsPerMonth.setColspan(2);
        dashboard.add(visitorsPerMonth);

        add(dashboard);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<DashboardBasic> { // hidden-source-line
    } // hidden-source-line
}
