package com.vaadin.demo.component.charts.charttypes;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.ChartType;
import com.vaadin.flow.component.charts.model.Configuration;
import com.vaadin.flow.component.charts.model.DataSeries;
import com.vaadin.flow.component.charts.model.DataSeriesItemTimeline;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("chart-type-timeline")
public class ChartTypeTimeline extends Div {
    public ChartTypeTimeline() {
        // tag::snippet[]
        Chart chart = new Chart(ChartType.TIMELINE);

        Configuration conf = chart.getConfiguration();
        conf.getxAxis().setVisible(false);
        conf.getyAxis().setVisible(false);
        conf.setTitle("Timeline of Space Exploration");
        conf.setSubTitle(
                "Info source: <a href=\"https://en.wikipedia.org/wiki/Timeline_of_space_exploration\">www.wikipedia.org</a>");
        conf.getTooltip().setEnabled(true);

        DataSeries series = new DataSeries();
        series.add(new DataSeriesItemTimeline("First dogs",
                "1951: First dogs in space",
                "22 July 1951 First dogs in space (Dezik and Tsygan)"));
        series.add(new DataSeriesItemTimeline("Sputnik 1",
                "1957: First artificial satellite",
                "4 October 1957 First artificial satellite. First signals from space."));
        series.add(new DataSeriesItemTimeline("First human spaceflight",
                "1961: First human spaceflight (Yuri Gagarin)",
                "First human spaceflight (Yuri Gagarin), and the first human-crewed orbital flight"));
        series.add(new DataSeriesItemTimeline("First human on the Moon",
                "1969: First human on the Moon",
                "First human on the Moon, and first space launch from a celestial body other than the Earth. First sample return from the Moon"));

        conf.addSeries(series);
        // end::snippet[]

        add(new VerticalLayout(chart));
    }

    public static class Exporter extends DemoExporter<ChartTypeTimeline> { // hidden-source-line
    } // hidden-source-line
}
