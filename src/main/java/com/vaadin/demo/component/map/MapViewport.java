package com.vaadin.demo.component.map;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.map.Map;
import com.vaadin.flow.component.map.configuration.Coordinate;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

@Route("map-viewport")
public class MapViewport extends VerticalLayout {

    private final Icon zoomInIcon = VaadinIcon.SEARCH_PLUS.create();
    private final Icon zoomOutIcon = VaadinIcon.SEARCH_MINUS.create();

    public MapViewport() {
        Map map = new Map();
        add(map);

        // tag::snippet1[]
        MenuBar menuBar = new MenuBar();
        SubMenu moveToSubMenu = menuBar.addItem("Move To...").getSubMenu();

        // Add menu items for moving the viewport to different cities
        moveToSubMenu.addItem("Berlin", e -> {
            // For Vaadin 23.1, use Coordinate.fromLonLat to create coordinates
            // from longitude and latitude
            Coordinate coordinate = new Coordinate(13.404954, 52.520008);
            map.setCenter(coordinate);
            map.setZoom(10);
        });
        // end::snippet1[]

        moveToSubMenu.addItem("Hong Kong", e -> {
            Coordinate coordinate = new Coordinate(114.162813, 22.279328);
            map.setCenter(coordinate);
            map.setZoom(10);
        });

        moveToSubMenu.addItem("Moscow", e -> {
            Coordinate coordinate = new Coordinate(37.617298, 55.755825);
            map.setCenter(coordinate);
            map.setZoom(10);
        });

        moveToSubMenu.addItem("New York", e -> {
            Coordinate coordinate = new Coordinate(-74.005974, 40.712776);
            map.setCenter(coordinate);
            map.setZoom(10);
        });

        moveToSubMenu.addItem("Rio de Janeiro", e -> {
            Coordinate coordinate = new Coordinate(-43.2093727, -22.9110137);
            map.setCenter(coordinate);
            map.setZoom(10);
        });

        // tag::snippet2[]
        // Add menu items for zooming
        menuBar.addItem(zoomInIcon, e -> {
            double zoom = map.getView().getZoom();
            map.setZoom(zoom + 1);
        });
        menuBar.addItem(zoomOutIcon, e -> {
            double zoom = map.getView().getZoom();
            map.setZoom(zoom - 1);
        });
        // end::snippet2[]
        add(menuBar);
        setPadding(false);
    }

    public static class Exporter extends DemoExporter<MapViewport> { // hidden-source-line
    } // hidden-source-line
}
