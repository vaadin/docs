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
        DashboardSection statsSection = dashboard.addSection("Monthly Funnel Stats");

        DashboardWidget visitors = new DashboardWidget("Visitors");
        visitors.setContent(createWidgetContent());
        statsSection.add(visitors);

        DashboardWidget downloads = new DashboardWidget("Downloads");
        downloads.setContent(createWidgetContent());
        statsSection.add(downloads);

        DashboardWidget conversions = new DashboardWidget("Conversions");
        conversions.setContent(createWidgetContent());
        statsSection.add(conversions);
        // end::snippet[]

        DashboardSection detailsSection = dashboard.addSection("Visitor Details");
        DashboardWidget visitorsByCountry = new DashboardWidget("Visitors by country");
        visitorsByCountry.setContent(createWidgetContent());
        visitorsByCountry.setRowspan(2);
        detailsSection.add(visitorsByCountry);

        DashboardWidget browserDistribution = new DashboardWidget("Browsers");
        browserDistribution.setContent(createWidgetContent());
        detailsSection.add(browserDistribution);

        DashboardWidget catImage = new DashboardWidget("A kittykat!");
        catImage.setContent(createWidgetContent());
        detailsSection.add(catImage);

        DashboardWidget visitorsByBrowser = new DashboardWidget("Visitors by browser");
        visitorsByBrowser.setContent(createWidgetContent());
        visitorsByBrowser.setColspan(2);
        detailsSection.add(visitorsByBrowser);

        add(dashboard);
    }

    private Div createWidgetContent() {
        Div content = new Div();
        content.setClassName("dashboard-widget-content");
        return content;
    }

    public static class Exporter extends DemoExporter<DashboardSections> { // hidden-source-line
    } // hidden-source-line
}
