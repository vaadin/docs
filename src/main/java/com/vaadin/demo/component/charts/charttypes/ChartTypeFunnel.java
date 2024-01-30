package com.vaadin.demo.component.charts.charttypes;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.ChartType;
import com.vaadin.flow.component.charts.model.Configuration;
import com.vaadin.flow.component.charts.model.DataLabelsFunnel;
import com.vaadin.flow.component.charts.model.DataSeries;
import com.vaadin.flow.component.charts.model.DataSeriesItem;
import com.vaadin.flow.component.charts.model.PlotOptionsFunnel;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("chart-type-funnel")
public class ChartTypeFunnel extends Div {
    public ChartTypeFunnel() {
        // tag::snippet[]
        Chart chart = new Chart(ChartType.FUNNEL);

        Configuration conf = chart.getConfiguration();
        conf.setTitle("Sales funnel");
        conf.getLegend().setEnabled(false);

        PlotOptionsFunnel options = new PlotOptionsFunnel();
        options.setReversed(false);
        options.setNeckWidth("30%");
        options.setNeckHeight("30%");

        options.setWidth("70%");

        DataLabelsFunnel dataLabels = new DataLabelsFunnel();
        dataLabels.setFormat("<b>{point.name}</b> ({point.y:,.0f})");
        options.setDataLabels(dataLabels);

        DataSeries dataSeries = new DataSeries("Unique users");
        dataSeries.add(new DataSeriesItem("Website visits", 15654));
        dataSeries.add(new DataSeriesItem("Downloads", 4064));
        dataSeries.add(new DataSeriesItem("Requested price list", 1987));
        dataSeries.add(new DataSeriesItem("Invoice sent", 976));
        dataSeries.add(new DataSeriesItem("Finalized", 846));


        dataSeries.setPlotOptions(options);
        conf.addSeries(dataSeries);
        // end::snippet[]

        add(new VerticalLayout(chart));
    }

    public static class Exporter extends DemoExporter<ChartTypeFunnel> { // hidden-source-line
    } // hidden-source-line
}
