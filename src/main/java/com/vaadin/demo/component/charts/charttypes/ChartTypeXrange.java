package com.vaadin.demo.component.charts.charttypes;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.AxisType;
import com.vaadin.flow.component.charts.model.ChartType;
import com.vaadin.flow.component.charts.model.Configuration;
import com.vaadin.flow.component.charts.model.DataSeries;
import com.vaadin.flow.component.charts.model.DataSeriesItemXrange;
import com.vaadin.flow.component.charts.model.PlotOptionsXrange;
import com.vaadin.flow.component.charts.model.style.SolidColor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("chart-type-xrange")
public class ChartTypeXrange extends Div {
    public ChartTypeXrange() {
        // tag::snippet[]
        Chart chart = new Chart(ChartType.XRANGE);

        Configuration conf = chart.getConfiguration();
        conf.setTitle("X-range");
        conf.getxAxis().setType(AxisType.DATETIME);
        conf.getyAxis().setTitle("");
        conf.getyAxis().setCategories("Prototyping", "Development", "Testing");
        conf.getyAxis().setReversed(true);

        DataSeries series = new DataSeries();
        series.setName("Project 1");

        series.add(new DataSeriesItemXrange(getInstant(2014, 11, 21),
                getInstant(2014, 12, 2), 0, 0.25));
        series.add(new DataSeriesItemXrange(getInstant(2014, 12, 2),
                getInstant(2014, 12, 5), 1));
        series.add(new DataSeriesItemXrange(getInstant(2014, 12, 8),
                getInstant(2014, 12, 9), 2));
        series.add(new DataSeriesItemXrange(getInstant(2014, 12, 9),
                getInstant(2014, 12, 19), 1));
        series.add(new DataSeriesItemXrange(getInstant(2014, 12, 10),
                getInstant(2014, 12, 23), 2));

        PlotOptionsXrange options = new PlotOptionsXrange();
        options.setBorderColor(SolidColor.GRAY);
        options.setPointWidth(20);
        options.getDataLabels().setEnabled(true);
        series.setPlotOptions(options);
        conf.addSeries(series);
        // end::snippet[]

        add(new VerticalLayout(chart));
    }

    private Instant getInstant(int year, int month, int dayOfMonth) {
        return LocalDate.of(year, month, dayOfMonth).atStartOfDay()
                .toInstant(ZoneOffset.UTC);
    }

    public static class Exporter extends DemoExporter<ChartTypeXrange> { // hidden-source-line
    } // hidden-source-line
}
