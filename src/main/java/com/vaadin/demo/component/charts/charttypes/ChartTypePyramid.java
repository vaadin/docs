package com.vaadin.demo.component.charts.charttypes;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.ChartType;
import com.vaadin.flow.component.charts.model.Configuration;
import com.vaadin.flow.component.charts.model.DataLabelsFunnel;
import com.vaadin.flow.component.charts.model.DataSeries;
import com.vaadin.flow.component.charts.model.DataSeriesItem;
import com.vaadin.flow.component.charts.model.PlotOptionsPyramid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("chart-type-pyramid")
public class ChartTypePyramid extends Div {
    public ChartTypePyramid() {
        // tag::snippet[]
        Chart chart = new Chart(ChartType.PYRAMID);
        Configuration configuration = chart.getConfiguration();

        configuration.setTitle("Sales pyramid");
        configuration.getLegend().setEnabled(false);

        PlotOptionsPyramid plotOptionsSeries = new PlotOptionsPyramid();
        DataLabelsFunnel dataLabels = plotOptionsSeries.getDataLabels();
        dataLabels.setEnabled(true);
        dataLabels.setSoftConnector(true);
        dataLabels.setFormat("<b>{point.name}</b> ({point.y:,.0f})");

        plotOptionsSeries.setCenter("40%", "50%");
        plotOptionsSeries.setWidth("60%");

        configuration.setPlotOptions(plotOptionsSeries);

        DataSeries series = new DataSeries("Unique users");

        series.add(new DataSeriesItem("Website visits", 15654));
        series.add(new DataSeriesItem("Downloads", 4064));
        series.add(new DataSeriesItem("Requested price list", 1987));
        series.add(new DataSeriesItem("Invoice sent", 976));
        series.add(new DataSeriesItem("Finalized", 846));

        configuration.addSeries(series);
        // end::snippet[]

        add(new VerticalLayout(chart));
    }

    public static class Exporter extends DemoExporter<ChartTypePyramid> { // hidden-source-line
    } // hidden-source-line
}
