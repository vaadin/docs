package com.vaadin.demo.component.charts.charttypes;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.AxisTitle;
import com.vaadin.flow.component.charts.model.ChartType;
import com.vaadin.flow.component.charts.model.Configuration;
import com.vaadin.flow.component.charts.model.DataLabels;
import com.vaadin.flow.component.charts.model.ListSeries;
import com.vaadin.flow.component.charts.model.PlotOptionsBar;
import com.vaadin.flow.component.charts.model.Tooltip;
import com.vaadin.flow.component.charts.model.VerticalAlign;
import com.vaadin.flow.component.charts.model.XAxis;
import com.vaadin.flow.component.charts.model.YAxis;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("chart-type-bar")
public class ChartTypeBar extends Div {
    public ChartTypeBar() {
        // tag::snippet[]
        Chart chart = new Chart(ChartType.BAR);

        Configuration configuration = chart.getConfiguration();
        configuration.setTitle("Historic World Population by Region");
        configuration.setSubTitle("Source: <a href=\"https://en.wikipedia.org/wiki/World_population\">Wikipedia.org</a>");

        configuration.addSeries(new ListSeries("Year 1800", 107, 31, 635, 203, 2));
        configuration.addSeries(new ListSeries("Year 1900", 133, 156, 947, 408, 6));
        configuration.addSeries(new ListSeries("Year 2000", 814, 841, 3714, 727, 31));
        configuration.addSeries(new ListSeries("Year 2016", 1216, 1001, 4436, 738, 40));

        XAxis x = new XAxis();
        x.setCategories("Africa", "America", "Asia", "Europe", "Oceania");
        configuration.addxAxis(x);

        YAxis y = new YAxis();
        y.setMin(0);
        AxisTitle yTitle = new AxisTitle();
        yTitle.setText("Population (millions)");
        yTitle.setAlign(VerticalAlign.HIGH);
        y.setTitle(yTitle);
        configuration.addyAxis(y);

        Tooltip tooltip = new Tooltip();
        tooltip.setValueSuffix(" millions");
        configuration.setTooltip(tooltip);

        PlotOptionsBar plotOptions = new PlotOptionsBar();
        DataLabels dataLabels = new DataLabels();
        dataLabels.setEnabled(true);
        plotOptions.setDataLabels(dataLabels);
        configuration.setPlotOptions(plotOptions);
        // end::snippet[]

      add(new VerticalLayout(chart));
    }

    public static class Exporter extends DemoExporter<ChartTypeBar> { // hidden-source-line
    } // hidden-source-line

}
