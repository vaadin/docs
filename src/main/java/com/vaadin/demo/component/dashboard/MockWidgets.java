package com.vaadin.demo.component.dashboard;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.ChartType;
import com.vaadin.flow.component.charts.model.Configuration;
import com.vaadin.flow.component.charts.model.ListSeries;
import com.vaadin.flow.component.charts.model.XAxis;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.progressbar.ProgressBar;

import java.util.List;

public class MockWidgets {

    record KpiData(String value, String trend, boolean trendUp) {}

    record CountryData(String flag, String name, int visitors) {}

    record ShareData(String name, String share) {}

    private static final List<KpiData> KPI_WIDGETS = List.of(
            new KpiData("54,238", "+12.3%", true),
            new KpiData("11,842", "-3.8%", false),
            new KpiData("1,025", "+8.1%", true));

    private static final List<CountryData> COUNTRY_DATA = List.of(
            new CountryData("\uD83C\uDDFA\uD83C\uDDF8", "United States", 12847),
            new CountryData("\uD83C\uDDEC\uD83C\uDDE7", "United Kingdom", 6211),
            new CountryData("\uD83C\uDDE9\uD83C\uDDEA", "Germany", 4105),
            new CountryData("\uD83C\uDDEB\uD83C\uDDF7", "France", 3542),
            new CountryData("\uD83C\uDDEF\uD83C\uDDF5", "Japan", 2891),
            new CountryData("\uD83C\uDDE7\uD83C\uDDF7", "Brazil", 1764));

    private static final List<ShareData> BROWSER_DATA = List.of(
            new ShareData("Chrome", "64%"),
            new ShareData("Firefox", "18%"),
            new ShareData("Safari", "12%"),
            new ShareData("Edge", "4%"),
            new ShareData("Other", "2%"));

    private static final List<ShareData> TRAFFIC_DATA = List.of(
            new ShareData("Organic", "43%"),
            new ShareData("Direct", "27%"),
            new ShareData("Social", "18%"),
            new ShareData("Referral", "12%"));

    public static Component createVisitorsWidget() {
        return createKpiWidget(KPI_WIDGETS.get(0));
    }

    public static Component createDownloadsWidget() {
        return createKpiWidget(KPI_WIDGETS.get(1));
    }

    public static Component createConversionsWidget() {
        return createKpiWidget(KPI_WIDGETS.get(2));
    }

    public static Component createVisitorsByCountryWidget() {
        Div list = new Div();
        list.addClassName("dashboard-country-list-widget");

        int maxVisitors = COUNTRY_DATA.getFirst().visitors();

        for (CountryData country : COUNTRY_DATA) {
            Div row = new Div();
            row.addClassName("country-row");

            Div header = new Div();
            header.addClassName("country-header");

            Span name = new Span(
                    country.flag() + " " + country.name());
            name.addClassName("country-name");
            Span count = new Span(
                    String.format("%,d", country.visitors()));
            count.addClassName("country-count");
            header.add(name, count);

            ProgressBar bar = new ProgressBar(0, 1,
                    (double) country.visitors() / maxVisitors);

            row.add(header, bar);
            list.add(row);
        }

        return list;
    }

    public static Component createBrowsersWidget() {
        return createShareList(BROWSER_DATA);
    }

    public static Component createTrafficSourcesWidget() {
        return createShareList(TRAFFIC_DATA);
    }

    public static Component createVisitorsPerMonthWidget() {
        Chart chart = new Chart(ChartType.LINE);

        Configuration conf = chart.getConfiguration();
        conf.setTitle((String) null);
        conf.getLegend().setEnabled(false);
        conf.getyAxis().setTitle((String) null);
        conf.getTooltip().setValueSuffix(" visitors");

        XAxis xAxis = new XAxis();
        xAxis.setCategories("Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
                "Oct", "Nov", "Dec", "Jan", "Feb");
        conf.addxAxis(xAxis);

        conf.addSeries(new ListSeries("Visitors", 39210, 42500, 45890, 48120,
                51340, 49870, 46200, 48750, 50100, 52400, 51030, 54238));

        return chart;
    }

    private static Component createKpiWidget(KpiData data) {
        Div container = new Div();
        container.addClassName("dashboard-kpi-widget");

        Span valueSpan = new Span(data.value());
        valueSpan.addClassName("kpi-value");

        Div footer = new Div();
        footer.addClassName("kpi-footer");

        Span trendSpan = new Span(data.trend());
        trendSpan.addClassName(
                data.trendUp() ? "kpi-trend-up" : "kpi-trend-down");

        Span label = new Span("vs last month");

        footer.add(trendSpan, label);
        container.add(valueSpan, footer);

        return container;
    }

    private static Component createShareList(List<ShareData> items) {
        Div list = new Div();
        list.addClassName("dashboard-share-list-widget");

        for (ShareData item : items) {
            Div row = new Div();
            row.addClassName("share-row");

            Span name = new Span(item.name());
            Span share = new Span(item.share());
            share.addClassName("share-value");

            row.add(name, share);
            list.add(row);
        }

        return list;
    }
}
