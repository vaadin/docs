package com.vaadin.demo.component.charts.charttypes;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.ChartType;
import com.vaadin.flow.component.charts.model.Configuration;
import com.vaadin.flow.component.charts.model.DataLabels;
import com.vaadin.flow.component.charts.model.HorizontalAlign;
import com.vaadin.flow.component.charts.model.Level;
import com.vaadin.flow.component.charts.model.PlotOptionsTreemap;
import com.vaadin.flow.component.charts.model.TreeMapLayoutAlgorithm;
import com.vaadin.flow.component.charts.model.TreeSeries;
import com.vaadin.flow.component.charts.model.TreeSeriesItem;
import com.vaadin.flow.component.charts.model.VerticalAlign;
import com.vaadin.flow.component.charts.model.style.SolidColor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("chart-type-tree-map")
public class ChartTypeTreeMap extends Div {
    public ChartTypeTreeMap() {
        // tag::snippet[]
        Chart chart = new Chart(ChartType.TREEMAP);

        Configuration conf = chart.getConfiguration();

        conf.getTooltip().setEnabled(true);

        PlotOptionsTreemap plotOptions = new PlotOptionsTreemap();
        plotOptions.setLayoutAlgorithm(TreeMapLayoutAlgorithm.STRIPES);
        plotOptions.setAlternateStartingDirection(true);

        Level level1 = new Level();
        level1.setLevel(1);
        level1.setLayoutAlgorithm(TreeMapLayoutAlgorithm.SLICEANDDICE);

        DataLabels dataLabels = new DataLabels();
        dataLabels.setEnabled(true);
        dataLabels.setAlign(HorizontalAlign.LEFT);
        dataLabels.setVerticalAlign(VerticalAlign.TOP);

        level1.setDataLabels(dataLabels);
        plotOptions.setLevels(level1);

        TreeSeries series = createSeries();
        series.setPlotOptions(plotOptions);

        chart.getConfiguration().addSeries(series);

        chart.getConfiguration().setTitle("Fruit consumption");
        // end::snippet[]

        add(new VerticalLayout(chart));
    }

    private TreeSeries createSeries() {
        TreeSeries series = new TreeSeries();

        TreeSeriesItem apples = new TreeSeriesItem("A", "Apples");
        apples.setColor(new SolidColor("#EC2500"));

        TreeSeriesItem bananas = new TreeSeriesItem("B", "Bananas");
        bananas.setColor(new SolidColor("#ECE100"));

        TreeSeriesItem oranges = new TreeSeriesItem("O", "Oranges");
        oranges.setColor(new SolidColor("#EC9800"));

        TreeSeriesItem anneA = new TreeSeriesItem("Anne", apples, 5);
        TreeSeriesItem rickA = new TreeSeriesItem("Rick", apples, 3);
        TreeSeriesItem peterA = new TreeSeriesItem("Peter", apples, 4);

        TreeSeriesItem anneB = new TreeSeriesItem("Anne", bananas, 4);
        TreeSeriesItem rickB = new TreeSeriesItem("Rick", bananas, 10);
        TreeSeriesItem peterB = new TreeSeriesItem("Peter", bananas, 1);

        TreeSeriesItem anneO = new TreeSeriesItem("Anne", oranges, 1);
        TreeSeriesItem rickO = new TreeSeriesItem("Rick", oranges, 3);
        TreeSeriesItem peterO = new TreeSeriesItem("Peter", oranges, 3);

        TreeSeriesItem susanne = new TreeSeriesItem("Susanne", 2);
        susanne.setParent("Kiwi");
        susanne.setColor(new SolidColor("#9EDE00"));

        series.addAll(apples, bananas, oranges, anneA, rickA, peterA, anneB,
                rickB, peterB, anneO, rickO, peterO, susanne);

        return series;
    }

    public static class Exporter extends DemoExporter<ChartTypeTreeMap> { // hidden-source-line
    } // hidden-source-line
}
