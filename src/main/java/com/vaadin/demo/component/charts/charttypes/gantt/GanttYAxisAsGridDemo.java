package com.vaadin.demo.component.charts.charttypes.gantt;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.*;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Route("chart-gantt-y-axis-as-grid")
public class GanttYAxisAsGridDemo extends Div {

    private static final Instant TODAY = Instant.now()
            .truncatedTo(ChronoUnit.DAYS);

    // tag::snippet[]
    public GanttYAxisAsGridDemo() {
        Chart chart = new Chart(ChartType.GANTT);

        final Configuration configuration = chart.getConfiguration();
        configuration.setTitle("Gantt Chart Grid Demo");

        XAxis xAxis = configuration.getxAxis();
        xAxis.setTickPixelInterval(70);

        YAxis yAxis = configuration.getyAxis();
        yAxis.setType(AxisType.CATEGORY);

        AxisGrid grid = new AxisGrid();
        grid.setEnabled(true);
        // @formatter:off hidden-source-line
        grid.setColumns(List.of(
                createProjectColumn(),
                createEstDaysColumn(),
                createStartDateColumn(),
                createEndDateColumn()));
        // @formatter:on hidden-source-line
        yAxis.setGrid(grid);

        PlotOptionsGantt plotOptionsGantt = new PlotOptionsGantt();
        configuration.setPlotOptions(plotOptionsGantt);

        final GanttSeries projectDevelopmentSeries = createProjectDevelopmentSeries();
        PlotOptionsGantt seriesPlotOptions = new PlotOptionsGantt();
        projectDevelopmentSeries.setPlotOptions(seriesPlotOptions);
        configuration.addSeries(projectDevelopmentSeries);

        add(chart);
    }

    private XAxis createProjectColumn() {
        XAxis column = new XAxis();
        column.setTitle("Project1");
        final Labels label = new Labels();
        label.setFormat("{point.name}");
        column.setLabels(label);
        return column;
    }
    // end::snippet[]

    private XAxis createEstDaysColumn() {
        XAxis column = new XAxis();
        column.setTitle("Est. Days");
        final Labels label = new Labels();
        label.setUseHTML(true);
        label.setFormatter(
                "function () { var point = this.point,days = (1000 * 60 * 60 * 24),"
                        + "    number = (point.x2 - point.x) / days; "
                        + "    return '<div style=\"width: 50px; text-align: center\">' + Math.round(number * 100) / 100 + '</div>'; }");
        column.setLabels(label);
        return column;
    }

    private XAxis createStartDateColumn() {
        XAxis column = new XAxis();
        column.setTitle("Start Date");
        final Labels label = new Labels();
        label.setFormat("{point.start:%e. %b}");
        column.setLabels(label);
        return column;
    }

    private XAxis createEndDateColumn() {
        XAxis column = new XAxis();
        column.setTitle("End Date");
        column.setOffset(30);
        final Labels label = new Labels();
        label.setFormat("{point.end:%e. %b}");
        column.setLabels(label);
        return column;
    }

    private GanttSeries createProjectDevelopmentSeries() {
        GanttSeries series = new GanttSeries();
        series.setName("Project 1");

        GanttSeriesItem item;

        item = new GanttSeriesItem("Start prototype", todayPlus(1),
                todayPlus(3));
        item.setY(0);
        item.setCustom(new TaskCustomData("Richards"));
        series.add(item);

        item = new GanttSeriesItem("Develop", todayPlus(2), todayPlus(5));
        item.setY(1);
        item.setCustom(new TaskCustomData("Oystein"));
        series.add(item);

        item = new GanttSeriesItem("Test prototype", todayPlus(5),
                todayPlus(7));
        item.setY(2);
        item.setCustom(new TaskCustomData("Torstein"));
        series.add(item);

        item = new GanttSeriesItem("Run acceptance tests", todayPlus(8),
                todayPlus(12));
        item.setY(3);
        item.setCustom(new TaskCustomData("Halliburton"));
        series.add(item);

        return series;
    }

    private Instant todayPlus(int days) {
        return TODAY.plus(days, ChronoUnit.DAYS);
    }

    @SuppressWarnings("unused")
    static class TaskCustomData extends AbstractConfigurationObject {
        private String assignee;

        public TaskCustomData(String assignee) {
            this.assignee = assignee;
        }

        public String getAssignee() {
            return assignee;
        }

        public void setAssignee(String assignee) {
            this.assignee = assignee;
        }
    }

    public static class Exporter extends DemoExporter<GanttYAxisAsGridDemo> { // hidden-source-line
    } // hidden-source-line
}
