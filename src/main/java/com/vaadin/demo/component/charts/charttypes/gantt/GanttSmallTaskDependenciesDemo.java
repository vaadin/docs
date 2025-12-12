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
