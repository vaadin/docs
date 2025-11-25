/*
 * Copyright 2000-2024 Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.vaadin.demo.component.charts.charttypes.gantt;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.*;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;

@Route("chart-gantt-custom-labels")
public class GanttCustomLabelsDemo extends Div {
    private static final Instant TODAY = Instant.now()
            .truncatedTo(ChronoUnit.DAYS);

    public GanttCustomLabelsDemo() {
        Chart chart = new Chart(ChartType.GANTT);

        final Configuration configuration = chart.getConfiguration();

        configuration.setTitle("Gantt Chart with custom labels");
        configuration.setTooltip(new Tooltip(true));

        XAxis xAxis = configuration.getxAxis();
        xAxis.setMinPadding(0.05);
        xAxis.setMaxPadding(0.05);

        YAxis yAxis = configuration.getyAxis();
        yAxis.setCategories("Prototyping", "Development", "Testing");

        PlotOptionsGantt plotOptionsGantt = new PlotOptionsGantt();
        configuration.setPlotOptions(plotOptionsGantt);

        // tag::snippet[]
        final GanttSeries projectDevelopmentSeries = createProjectDevelopmentSeries();
        PlotOptionsGantt seriesPlotOptions = new PlotOptionsGantt();
        var dataLabels = new ArrayList<DataLabels>();

        var assigneeLabel = new DataLabels(true);
        assigneeLabel.setAlign(HorizontalAlign.LEFT);
        assigneeLabel.setFormat("{point.custom.assignee}");
        dataLabels.add(assigneeLabel);

        var endDateLabel = new DataLabels(true);
        endDateLabel.setAlign(HorizontalAlign.RIGHT);
        endDateLabel.setFormat("{point.end:%e. %b}");
        dataLabels.add(endDateLabel);

        var avatarLabel = new DataLabels(true);
        avatarLabel.setAlign(HorizontalAlign.LEFT);
        avatarLabel.setUseHTML(true);
        avatarLabel.setFormat(
                "<div style=\"width: 20px; height: 20px; overflow: hidden; margin-left: -30px\">"
                        + "                <img src=\"https://ui-avatars.com/api/?background=random&color=fff&size=20&length=1&rounded=true&name={point.custom.assignee}\"> "
                        + "                </div>");
        dataLabels.add(avatarLabel);

        seriesPlotOptions.setDataLabels(dataLabels);
        projectDevelopmentSeries.setPlotOptions(seriesPlotOptions);
        // end::snippet[]
        configuration.addSeries(projectDevelopmentSeries);

        add(chart);
    }

    private GanttSeries createProjectDevelopmentSeries() {
        GanttSeries series = new GanttSeries();
        series.setName("Project 1");

        GanttSeriesItem item;

        item = new GanttSeriesItem(0, todayPlus(1), todayPlus(3));
        item.setCustom(new TaskCustomData("John"));
        series.add(item);

        item = new GanttSeriesItem(1, todayPlus(2), todayPlus(5));
        item.setCustom(new TaskCustomData("William"));
        series.add(item);

        item = new GanttSeriesItem(2, todayPlus(5), todayPlus(7));
        item.setCustom(new TaskCustomData("Jane"));
        series.add(item);

        item = new GanttSeriesItem(1, todayPlus(8), todayPlus(16));
        item.setCustom(new TaskCustomData("John"));
        series.add(item);

        item = new GanttSeriesItem(2, todayPlus(10), todayPlus(23));
        item.setCustom(new TaskCustomData("Jane"));
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

    public static class Exporter extends DemoExporter<GanttCustomLabelsDemo> { // hidden-source-line
    } // hidden-source-line
}
