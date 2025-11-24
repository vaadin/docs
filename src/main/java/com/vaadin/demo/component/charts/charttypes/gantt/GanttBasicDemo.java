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

@Route("chart-gantt-basic")
public class GanttBasicDemo extends Div {

    public GanttBasicDemo() {
        // tag::snippet[]
        Chart chart = new Chart(ChartType.GANTT);

        final Configuration configuration = chart.getConfiguration();

        configuration.setTitle("Gantt Chart");

        XAxis xAxis = configuration.getxAxis();
        xAxis.setMin(Instant.parse("2014-10-17T00:00:00Z"));
        xAxis.setMax(Instant.parse("2014-10-30T00:00:00Z"));

        PlotOptionsGantt plotOptionsGantt = new PlotOptionsGantt();
        configuration.setPlotOptions(plotOptionsGantt);

        GanttSeries series = new GanttSeries();
        series.add(new GanttSeriesItem("Start prototype",
                Instant.parse("2014-10-18T00:00:00Z"),
                Instant.parse("2014-10-25T00:00:00Z")));

        series.add(new GanttSeriesItem("Test prototype",
                Instant.parse("2014-10-27T00:00:00Z"),
                Instant.parse("2014-10-29T00:00:00Z")));

        series.add(new GanttSeriesItem("Develop",
                Instant.parse("2014-10-20T00:00:00Z"),
                Instant.parse("2014-10-25T00:00:00Z")));

        series.add(new GanttSeriesItem("Run acceptance tests",
                Instant.parse("2014-10-23T00:00:00Z"),
                Instant.parse("2014-10-26T00:00:00Z")));

        configuration.addSeries(series);
        // end::snippet[]

        add(chart);
    }

    public static class Exporter extends DemoExporter<GanttBasicDemo> { // hidden-source-line
    } // hidden-source-line
}
