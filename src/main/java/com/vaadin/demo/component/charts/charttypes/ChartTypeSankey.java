package com.vaadin.demo.component.charts.charttypes;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.ChartType;
import com.vaadin.flow.component.charts.model.Configuration;
import com.vaadin.flow.component.charts.model.DataLabels;
import com.vaadin.flow.component.charts.model.DataSeries;
import com.vaadin.flow.component.charts.model.DataSeriesItemSankey;
import com.vaadin.flow.component.charts.model.PlotOptionsSankey;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("chart-type-sankey")
public class ChartTypeSankey extends Div {
    public ChartTypeSankey() {
        // tag::snippet[]
        Chart chart = new Chart(ChartType.SANKEY);

        Configuration conf = chart.getConfiguration();
        conf.setTitle("Website Visitors");
        conf.setSubTitle("From acquisition channel to outcome");

        DataSeries series = new DataSeries("Visitors");
        series.add(new DataSeriesItemSankey("Search", "Landing Page", 850));
        series.add(new DataSeriesItemSankey("Social", "Landing Page", 420));
        series.add(new DataSeriesItemSankey("Email", "Landing Page", 310));
        series.add(new DataSeriesItemSankey("Search", "Blog", 640));
        series.add(new DataSeriesItemSankey("Social", "Blog", 520));

        series.add(new DataSeriesItemSankey("Landing Page", "Sign-Up", 480));
        series.add(new DataSeriesItemSankey("Landing Page", "Bounce", 1100));
        series.add(new DataSeriesItemSankey("Blog", "Sign-Up", 240));
        series.add(new DataSeriesItemSankey("Blog", "Bounce", 920));

        series.add(new DataSeriesItemSankey("Sign-Up", "Trial", 520));
        series.add(new DataSeriesItemSankey("Sign-Up", "Newsletter", 200));

        conf.addSeries(series);

        PlotOptionsSankey plotOptions = new PlotOptionsSankey();
        plotOptions.setCurveFactor(0.5);
        plotOptions.setNodeWidth(16);
        plotOptions.setNodePadding(12);

        DataLabels dataLabels = new DataLabels();
        dataLabels.setEnabled(true);
        plotOptions.setDataLabels(dataLabels);

        conf.setPlotOptions(plotOptions);
        // end::snippet[]

        add(new VerticalLayout(chart));
    }

    public static class Exporter extends DemoExporter<ChartTypeSankey> { // hidden-source-line
    } // hidden-source-line
}
