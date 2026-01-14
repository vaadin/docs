package com.vaadin.demo.component.charts.charttypes.gantt;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.*;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Route("chart-gantt-current-date-indication")
public class GanttCurrentDateIndicationDemo extends Div {

    private static final Instant TODAY = Instant.now()
            .truncatedTo(ChronoUnit.DAYS);

    public GanttCurrentDateIndicationDemo() {
        // tag::snippet[]
        Chart chart = new Chart(ChartType.GANTT);

        final Configuration configuration = chart.getConfiguration();

        final XAxis xAxis = configuration.getxAxis();
        xAxis.setCurrentDateIndicator(true);
        // end::snippet[]

        PlotOptionsGantt plotOptionsGantt = new PlotOptionsGantt();
        configuration.setPlotOptions(plotOptionsGantt);

        GanttSeries series = new GanttSeries();

        series.add(new GanttSeriesItem("Start prototype", todayPlus(-5),
                todayPlus(-3)));

        series.add(new GanttSeriesItem("Test prototype", todayPlus(-2),
                todayPlus(1)));

        series.add(new GanttSeriesItem("Develop", todayPlus(2), todayPlus(4)));

        series.add(new GanttSeriesItem("Run acceptance tests", todayPlus(5),
                todayPlus(8)));

        configuration.addSeries(series);

        add(chart);
    }

    private Instant todayPlus(int days) {
        return TODAY.plus(days, ChronoUnit.DAYS);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GanttCurrentDateIndicationDemo> { // hidden-source-line
    } // hidden-source-line
}
