package com.vaadin.demo.component.charts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.ChartType;
import com.vaadin.flow.component.charts.model.Configuration;
import com.vaadin.flow.component.charts.model.Cursor;
import com.vaadin.flow.component.charts.model.DataSeries;
import com.vaadin.flow.component.charts.model.DataSeriesItem;
import com.vaadin.flow.component.charts.model.ListSeries;
import com.vaadin.flow.component.charts.model.Marker;
import com.vaadin.flow.component.charts.model.PlotOptionsArea;
import com.vaadin.flow.component.charts.model.PlotOptionsColumn;
import com.vaadin.flow.component.charts.model.PlotOptionsLine;
import com.vaadin.flow.component.charts.model.PlotOptionsPie;
import com.vaadin.flow.component.charts.model.PlotOptionsSeries;
import com.vaadin.flow.component.charts.model.PointPlacement;
import com.vaadin.flow.component.charts.model.Stacking;
import com.vaadin.flow.component.charts.model.XAxis;
import com.vaadin.flow.component.charts.model.YAxis;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("charts-overview")
public class ChartsOverview extends Div {

    public ChartsOverview() {
        getStyle().set("display", "grid") // hidden-source-line
                .set("grid-template-columns", // hidden-source-line
                        "repeat(auto-fill, minmax(320px, 1fr))") // hidden-source-line
                .set("background-color", "var(--docs-surface-color-2)") // hidden-source-line
                .set("padding", "0.5rem") // hidden-source-line
                .set("box-sizing", "border-box"); // hidden-source-line
        // tag::snippet[]
        Chart column = new Chart(ChartType.COLUMN);
        Configuration columnConf = column.getConfiguration();
        columnConf.setTitle((String) null);
        columnConf.getxAxis().setCategories("Jan", "Feb", "Mar");
        columnConf.getyAxis().setTitle("");
        columnConf.addSeries(new ListSeries("Tokyo", 49.9, 71.5, 106.4));
        columnConf.addSeries(new ListSeries("New York", 83.6, 78.8, 98.5));
        columnConf.addSeries(new ListSeries("London", 48.9, 38.8, 39.3));

        Chart area = new Chart(ChartType.AREA);
        Configuration areaConf = area.getConfiguration();
        areaConf.setTitle((String) null);
        areaConf.getxAxis().setCategories("Jan", "Feb", "Mar", "Apr", "May",
                "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        areaConf.getxAxis().setVisible(false);
        areaConf.getyAxis().setTitle("");
        PlotOptionsArea areaOptions = new PlotOptionsArea();
        areaOptions.setStacking(Stacking.NORMAL);
        areaOptions.setMarker(new Marker(false));
        areaConf.setPlotOptions(areaOptions);
        areaConf.addSeries(new ListSeries("United States dollar", 135, 125, 89,
                124, 105, 81, 111, 94, 95, 129, 98, 84));
        areaConf.addSeries(new ListSeries("Euro", 62, 72, 89, 68, 94, 92, 110,
                100, 109, 89, 86, 105));
        areaConf.addSeries(new ListSeries("Japanese yen", 30, 25, 32, 26, 15,
                31, 24, 32, 21, 8, 12, 32));
        areaConf.addSeries(new ListSeries("Pound sterling", 32, 21, 8, 12, 32,
                21, 12, 30, 25, 19, 26, 15));

        Chart pie = new Chart(ChartType.PIE);
        Configuration pieConf = pie.getConfiguration();
        pieConf.setTitle((String) null);
        pieConf.getTooltip().setPointFormat(
                "{series.name}: <b>{point.percentage:.1f}%</b>");
        PlotOptionsPie pieOptions = new PlotOptionsPie();
        pieOptions.setAllowPointSelect(true);
        pieOptions.setCursor(Cursor.POINTER);
        pieOptions.setInnerSize("60%");
        pieConf.setPlotOptions(pieOptions);
        DataSeries brands = new DataSeries("Brands");
        brands.add(new DataSeriesItem("Chrome", 38));
        brands.add(new DataSeriesItem("Firefox", 24));
        DataSeriesItem edge = new DataSeriesItem("Edge", 15);
        edge.setSliced(true);
        edge.setSelected(true);
        brands.add(edge);
        brands.add(new DataSeriesItem("Internet Explorer", 8));
        pieConf.addSeries(brands);

        Chart polar = new Chart();
        Configuration polarConf = polar.getConfiguration();
        polarConf.setTitle((String) null);
        polarConf.getChart().setPolar(true);
        XAxis polarXAxis = new XAxis();
        polarXAxis.setTickInterval(45);
        polarXAxis.setMin(0);
        polarXAxis.setMax(360);
        polarXAxis.setVisible(false);
        polarConf.addxAxis(polarXAxis);
        YAxis polarYAxis = new YAxis();
        polarYAxis.setMin(0);
        polarConf.addyAxis(polarYAxis);
        PlotOptionsSeries seriesOptions = new PlotOptionsSeries();
        seriesOptions.setPointStart(0);
        seriesOptions.setPointInterval(45);
        PlotOptionsColumn columnOptions = new PlotOptionsColumn();
        columnOptions.setPointPadding(0);
        columnOptions.setGroupPadding(0);
        polarConf.setPlotOptions(seriesOptions, columnOptions);
        ListSeries polarColumn = new ListSeries("Column", 8, 7, 6, 5, 4, 3, 2,
                1);
        PlotOptionsColumn polarColumnOptions = new PlotOptionsColumn();
        polarColumnOptions.setPointPlacement(PointPlacement.BETWEEN);
        polarColumn.setPlotOptions(polarColumnOptions);
        ListSeries polarLine = new ListSeries("Line", 1, 2, 3, 4, 5, 6, 7, 8);
        polarLine.setPlotOptions(new PlotOptionsLine());
        ListSeries polarArea = new ListSeries("Area", 1, 8, 2, 7, 3, 6, 4, 5);
        polarArea.setPlotOptions(new PlotOptionsArea());
        polarConf.setSeries(polarColumn, polarLine, polarArea);

        add(column, area, pie, polar);
        // end::snippet[]
        for (Chart chart : new Chart[] { column, area, pie, polar }) { // hidden-source-line
            chart.getStyle().set("padding", "0.5rem") // hidden-source-line
                    .set("box-sizing", "border-box"); // hidden-source-line
        } // hidden-source-line
    }

    public static class Exporter extends DemoExporter<ChartsOverview> { // hidden-source-line
    } // hidden-source-line
}
