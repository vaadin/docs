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

@Route("chart-gantt-custom-data")
public class GanttCustomDataDemo extends Div {
    private static final Instant TODAY = Instant.now()
            .truncatedTo(ChronoUnit.DAYS);

    public GanttCustomDataDemo() {
        Chart chart = new Chart(ChartType.GANTT);

        final Configuration configuration = chart.getConfiguration();

        configuration.setTitle("Gantt Chart With Custom Data");

        YAxis yAxis = configuration.getyAxis();
        yAxis.setCategories("Prototyping", "Development", "Testing");

        PlotOptionsGantt plotOptionsGantt = new PlotOptionsGantt();
        configuration.setPlotOptions(plotOptionsGantt);
        // tag::snippet[]
        // Create series with custom data
        GanttSeries series = new GanttSeries();
        GanttSeriesItem item;

        item = new GanttSeriesItem(0, todayPlus(1), todayPlus(3));
        item.setCustom(new TaskCustomData("Aria Bailey"));
        series.add(item);

        item = new GanttSeriesItem(1, todayPlus(2), todayPlus(5));
        item.setCustom(new TaskCustomData("Eleanor Price"));

        series.add(item);
        // end::snippet[]

        // Configure Labels
        PlotOptionsGantt seriesPlotOptions = new PlotOptionsGantt();
        var dataLabels = new ArrayList<DataLabels>();

        var assigneeLabel = new DataLabels(true);
        assigneeLabel.setAlign(HorizontalAlign.LEFT);
        assigneeLabel.setFormat("{point.custom.assignee}");
        dataLabels.add(assigneeLabel);

        seriesPlotOptions.setDataLabels(dataLabels);
        series.setPlotOptions(seriesPlotOptions);
        configuration.addSeries(series);

        // Configure click callback
        chart.addPointClickListener(event -> {
            var ganttSeries = ((GanttSeries) event.getSeries());
            var customData = (TaskCustomData) ganttSeries
                    .get(event.getItemIndex()).getCustom();
            System.out.println(
                    "Clicked on task assigned to " + customData.assignee);
        });

        add(chart);
    }

    private Instant todayPlus(int days) {
        return TODAY.plus(days, ChronoUnit.DAYS);
    }

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

    public static class Exporter extends DemoExporter<GanttCustomDataDemo> { // hidden-source-line
    } // hidden-source-line
}
