package com.vaadin.demo.component.charts.charttypes;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.AxisType;
import com.vaadin.flow.component.charts.model.ChartType;
import com.vaadin.flow.component.charts.model.Configuration;
import com.vaadin.flow.component.charts.model.DataLabels;
import com.vaadin.flow.component.charts.model.DataSeries;
import com.vaadin.flow.component.charts.model.DataSeriesItem;
import com.vaadin.flow.component.charts.model.PlotOptionsWaterfall;
import com.vaadin.flow.component.charts.model.VerticalAlign;
import com.vaadin.flow.component.charts.model.WaterFallSum;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("chart-type-waterfall")
public class ChartTypeWaterfall extends Div {
    public ChartTypeWaterfall() {
        // tag::snippet[]
        Chart chart = new Chart(ChartType.WATERFALL);

        DataSeries dataSeries = new DataSeries();

        dataSeries.add(new DataSeriesItem("Start", 120000));
        dataSeries.add(new DataSeriesItem("Product Revenue", 569000));
        dataSeries.add(new DataSeriesItem("Service Revenue", 231000));
        WaterFallSum positiveBalance = new WaterFallSum("Positive Balance");
        positiveBalance.setIntermediate(true);
        dataSeries.add(positiveBalance);

        dataSeries.add(new DataSeriesItem("Fixed Costs", -342000));
        dataSeries.add(new DataSeriesItem("Variable Costs", -233000));
        WaterFallSum balance = new WaterFallSum("Balance");
        dataSeries.add(balance);

        PlotOptionsWaterfall opts = new PlotOptionsWaterfall();
        DataLabels dataLabels = new DataLabels(true);
        dataLabels.setVerticalAlign(VerticalAlign.TOP);
        dataLabels.setY(-30);
        dataLabels.setFormatter("function() { return this.y / 1000 + 'k'; }");
        opts.setDataLabels(dataLabels);

        dataSeries.setPlotOptions(opts);

        Configuration configuration = chart.getConfiguration();
        configuration.addSeries(dataSeries);
        configuration.getxAxis().setType(AxisType.CATEGORY);
        // end::snippet[]

        add(new VerticalLayout(chart));
    }

    public static class Exporter extends DemoExporter<ChartTypeWaterfall> { // hidden-source-line
    } // hidden-source-line
}
