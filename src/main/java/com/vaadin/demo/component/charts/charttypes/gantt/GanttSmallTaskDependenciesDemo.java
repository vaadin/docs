package com.vaadin.demo.component.charts.charttypes.gantt;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.*;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Route("chart-gantt-small-task-dependencies")
public class GanttSmallTaskDependenciesDemo extends Div {
    private static final Instant TODAY = Instant.now()
            .truncatedTo(ChronoUnit.DAYS);

    public GanttSmallTaskDependenciesDemo() {
        Chart chart = new Chart(ChartType.GANTT);

        final Configuration configuration = chart.getConfiguration();
        configuration.setTitle("Gantt Task Dependencies");
        configuration.setPlotOptions(new PlotOptionsGantt());
        XAxis xAxis = configuration.getxAxis();
        xAxis.setMinPadding(0.1);
        xAxis.setMaxPadding(0.1);

        // tag::snippet[]
        GanttSeries series = new GanttSeries();

        GanttSeriesItem task1 = new GanttSeriesItem("task1", todayPlus(1),
                todayPlus(2));
        task1.setId("task1");

        GanttSeriesItem task2 = new GanttSeriesItem("task2", todayPlus(4),
                todayPlus(8));
        task2.setId("task2");

        task2.addDependency(task1.getId());

        series.addAll(task1, task2);
        configuration.addSeries(series);
        // end::snippet[]

        add(chart);
    }

    private Instant todayPlus(int days) {
        return TODAY.plus(days, ChronoUnit.DAYS);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GanttSmallTaskDependenciesDemo> { // hidden-source-line
    } // hidden-source-line
}
