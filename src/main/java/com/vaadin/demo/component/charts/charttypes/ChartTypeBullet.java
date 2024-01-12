package com.vaadin.demo.component.charts.charttypes;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.ChartType;
import com.vaadin.flow.component.charts.model.Configuration;
import com.vaadin.flow.component.charts.model.DataSeries;
import com.vaadin.flow.component.charts.model.DataSeriesItemBullet;
import com.vaadin.flow.component.charts.model.PlotBand;
import com.vaadin.flow.component.charts.model.PlotOptionsBullet;
import com.vaadin.flow.component.charts.model.YAxis;
import com.vaadin.flow.component.charts.model.style.SolidColor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("chart-type-bullet")
public class ChartTypeBullet extends Div {
    public ChartTypeBullet() {
        // tag::snippet[]
        Chart chart = new Chart(ChartType.BULLET);

        Configuration conf = chart.getConfiguration();
        conf.getChart().setInverted(true);
        conf.getChart().setMarginLeft(135);
        conf.getLegend().setEnabled(false);
        YAxis yAxis = conf.getyAxis();
        yAxis.setGridLineWidth(0);
        yAxis.setTitle("");
        yAxis.addPlotBand(new PlotBand(0, 150,
                new SolidColor("#666666")));
        yAxis.addPlotBand(new PlotBand(150, 225,
                new SolidColor("#999999")));
        yAxis.addPlotBand(new PlotBand(225, 9e9,
                new SolidColor("#bbbbbb")));
        conf.getxAxis().addCategory("<span style=\"font-size: 13px; font-weight: bold;\">Revenue</span><br/>U.S. $ (1,000s)");
        conf.getTooltip().setPointFormat("<b>{point.y}</b> (with target at {point.target})");
        PlotOptionsBullet options = new PlotOptionsBullet();
        options.setPointPadding(0.25);
        options.setBorderWidth(0);
        options.setColor(SolidColor.BLACK);
        options.getTargetOptions().setWidth("200%");
        conf.setExporting(false);
        DataSeries series = new DataSeries();
        series.add(new DataSeriesItemBullet(275, 250));
        series.setPlotOptions(options);
        conf.addSeries(series);
        // end::snippet[]

        add(new VerticalLayout(chart));
    }

    public static class Exporter extends DemoExporter<ChartTypeBullet> { // hidden-source-line
    } // hidden-source-line
}
