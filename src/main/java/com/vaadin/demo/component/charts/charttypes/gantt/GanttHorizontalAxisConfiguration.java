package com.vaadin.demo.component.charts.charttypes.gantt;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.*;
import com.vaadin.flow.component.charts.model.style.Style;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Route("chart-gantt-horizontal-axis-configuration")
public class GanttHorizontalAxisConfiguration extends Div {

    private static final Instant TODAY = Instant.now()
            .truncatedTo(ChronoUnit.DAYS);

    public GanttHorizontalAxisConfiguration() {
        Chart chart = new Chart(ChartType.GANTT);

        final Configuration configuration = chart.getConfiguration();
        configuration.getChart().setHeight("330");

        configuration.setTitle("Customized XAxis");
        configuration.setSubTitle("Showing years, months and week numbers");
        configureYearsMonthsWeeksOnXAxis(configuration);

        YAxis yAxis = configuration.getyAxis();
        yAxis.setCategories("Prototyping", "Development", "Testing");

        PlotOptionsGantt plotOptionsGantt = new PlotOptionsGantt();
        configuration.setPlotOptions(plotOptionsGantt);

        final GanttSeries projectDevelopmentSeries = createProjectDevelopmentSeries();
        configuration.addSeries(projectDevelopmentSeries);

        add(chart);
    }

    // tag::snippet[]
    private void configureYearsMonthsWeeksOnXAxis(Configuration configuration) {
        configureWeeksAxis(configuration);
        configureMonthsAxis(configuration);
        configureYearsAxis(configuration);
    }

    private void configureWeeksAxis(Configuration configuration) {
        XAxis axis = new XAxis();
        configuration.addxAxis(axis);

        axis.setMinPadding(0.02);
        axis.setMaxPadding(0.02);
        axis.setUnits(new TimeUnitMultiples(TimeUnit.WEEK, 1));

        final Labels labels = new Labels();
        labels.setPadding(1);
        labels.setAlign(HorizontalAlign.LEFT);
        var style = new Style();
        style.setFontSize("8px");
        labels.setStyle(style);
        axis.setLabels(labels);

        axis.setGrid(new AxisGrid());
        axis.getGrid().setCellHeight(20);
    }
    // end::snippet[]

    private void configureMonthsAxis(Configuration configuration) {
        XAxis axis = new XAxis();
        configuration.addxAxis(axis);
        axis.setTickInterval(1000 * 60 * 60 * 24 * 30L);
        axis.setUnits(new TimeUnitMultiples(TimeUnit.MONTH, 1));

        final Labels labels = new Labels();
        labels.setAlign(HorizontalAlign.LEFT);
        var style = new Style();
        style.setFontSize("8px");
        labels.setStyle(style);
        axis.setLabels(labels);

        axis.setGrid(new AxisGrid());
        axis.getGrid().setCellHeight(20);
    }

    private void configureYearsAxis(Configuration configuration) {
        XAxis axis = new XAxis();
        configuration.addxAxis(axis);
        axis.setTickInterval(1000 * 60 * 60 * 24 * 365L);
        axis.setUnits(new TimeUnitMultiples(TimeUnit.YEAR, 1));

        final Labels labels = new Labels();
        labels.setAlign(HorizontalAlign.LEFT);
        var style = new Style();
        style.setFontSize("8px");
        labels.setStyle(style);
        axis.setLabels(labels);

        axis.setGrid(new AxisGrid());
        axis.getGrid().setCellHeight(20);
    }

    private GanttSeries createProjectDevelopmentSeries() {
        GanttSeries series = new GanttSeries();
        series.add(
                new GanttSeriesItem(0, startOfYearPlus(1), startOfYearPlus(3)));
        series.add(
                new GanttSeriesItem(1, startOfYearPlus(4), startOfYearPlus(5)));
        series.add(new GanttSeriesItem(1, startOfYearPlus(8),
                startOfYearPlus(10)));
        series.add(
                new GanttSeriesItem(2, startOfYearPlus(5), startOfYearPlus(7)));
        series.add(new GanttSeriesItem(2, startOfYearPlus(9),
                startOfYearPlus(11)));
        return series;
    }

    private Instant startOfYearPlus(int months) {
        return TODAY.plus(months * 30L, ChronoUnit.DAYS);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GanttHorizontalAxisConfiguration> { // hidden-source-line
    } // hidden-source-line
}
