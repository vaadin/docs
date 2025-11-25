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

    public static class Exporter extends DemoExporter<GanttCurrentDateIndicationDemo> { // hidden-source-line
    } // hidden-source-line
}
