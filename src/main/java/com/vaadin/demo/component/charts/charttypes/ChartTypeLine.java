package com.vaadin.demo.component.charts.charttypes;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.ChartType;
import com.vaadin.flow.component.charts.model.Configuration;
import com.vaadin.flow.component.charts.model.HorizontalAlign;
import com.vaadin.flow.component.charts.model.LayoutDirection;
import com.vaadin.flow.component.charts.model.Legend;
import com.vaadin.flow.component.charts.model.ListSeries;
import com.vaadin.flow.component.charts.model.PlotOptionsSeries;
import com.vaadin.flow.component.charts.model.VerticalAlign;
import com.vaadin.flow.component.charts.model.YAxis;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("chart-type-line")
public class ChartTypeLine extends Div {
    public ChartTypeLine() {
        // tag::snippet[]
        Chart chart = new Chart(ChartType.LINE);

        Configuration configuration = chart.getConfiguration();

        configuration.setTitle("Solar Employment Growth by Sector, 2010-2016");
        configuration.setSubTitle("Source: thesolarfoundation.com");

        YAxis yAxis = configuration.getyAxis();
        yAxis.setTitle("Number of Employees");

        Legend legend = configuration.getLegend();
        legend.setLayout(LayoutDirection.VERTICAL);
        legend.setVerticalAlign(VerticalAlign.MIDDLE);
        legend.setAlign(HorizontalAlign.RIGHT);

        PlotOptionsSeries plotOptionsSeries = new PlotOptionsSeries();
        plotOptionsSeries.setPointStart(2010);
        configuration.setPlotOptions(plotOptionsSeries);

        configuration.addSeries(new ListSeries("Installation", 43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175));
        configuration.addSeries(new ListSeries("Manufacturing", 24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434));
        configuration.addSeries(new ListSeries("Sales & Distribution", 11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387));
        configuration.addSeries(new ListSeries("Project Development", null, null, 7988, 12169, 15112, 22452, 34400, 34227));
        configuration.addSeries(new ListSeries("Other", 12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111));
        // end::snippet[]

        add(new VerticalLayout(chart));
    }

    public static class Exporter extends DemoExporter<ChartTypeLine> { // hidden-source-line
    } // hidden-source-line
}
