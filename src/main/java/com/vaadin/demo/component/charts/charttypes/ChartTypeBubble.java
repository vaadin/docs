package com.vaadin.demo.component.charts.charttypes;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.ChartType;
import com.vaadin.flow.component.charts.model.Configuration;
import com.vaadin.flow.component.charts.model.DataSeries;
import com.vaadin.flow.component.charts.model.DataSeriesItem3d;
import com.vaadin.flow.component.charts.model.PlotOptionsBubble;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("chart-type-bubble")
public class ChartTypeBubble extends Div {
    public ChartTypeBubble() {
        // tag::snippet[]
        Chart chart = new Chart(ChartType.BUBBLE);

        Configuration conf = chart.getConfiguration();
        conf.setTitle((String) null);

        DataSeries dataSeries = new DataSeries("All bubbles shown");
        dataSeries.add(new DataSeriesItem3d(9, 81, 13));
        dataSeries.add(new DataSeriesItem3d(98, 5, 39));
        dataSeries.add(new DataSeriesItem3d(51, 50, 23));
        dataSeries.add(new DataSeriesItem3d(41, 22, -36));
        dataSeries.add(new DataSeriesItem3d(58, 24, -30));
        dataSeries.add(new DataSeriesItem3d(78, 37, -16));
        dataSeries.add(new DataSeriesItem3d(55, 56, 3));
        dataSeries.add(new DataSeriesItem3d(18, 45, 20));
        dataSeries.add(new DataSeriesItem3d(42, 44, -22));
        dataSeries.add(new DataSeriesItem3d(3, 52, 9));
        dataSeries.add(new DataSeriesItem3d(31, 18, 47));
        dataSeries.add(new DataSeriesItem3d(79, 91, 13));
        dataSeries.add(new DataSeriesItem3d(93, 23, -27));
        dataSeries.add(new DataSeriesItem3d(44, 83, -28));

        PlotOptionsBubble opts = new PlotOptionsBubble();
        opts.setMaxSize("120");
        opts.setMinSize("3");

        conf.setPlotOptions(opts);

        conf.addSeries(dataSeries);

        DataSeries dataSeries2 = new DataSeries("Negative bubbles hidden");
        dataSeries2.add(new DataSeriesItem3d(13, 30, 10));
        dataSeries2.add(new DataSeriesItem3d(23, 20, -10));
        dataSeries2.add(new DataSeriesItem3d(53, 40, 10));

        opts = new PlotOptionsBubble();
        opts.setDisplayNegative(false);
        dataSeries2.setPlotOptions(opts);

        conf.addSeries(dataSeries2);
        // end::snippet[]

        add(new VerticalLayout(chart));
    }

    public static class Exporter extends DemoExporter<ChartTypeBubble> { // hidden-source-line
    } // hidden-source-line
}
