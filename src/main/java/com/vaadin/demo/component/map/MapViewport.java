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
            Coordinate coordinate = Coordinate.fromLonLat(13.404954, 52.520008);
            map.getView().setCenter(coordinate);
            map.getView().setZoom(10);
        });
        // end::snippet1[]

        moveToSubMenu.addItem("Hong Kong", e -> {
            Coordinate coordinate = Coordinate.fromLonLat(114.162813, 22.279328);
            map.getView().setCenter(coordinate);
            map.getView().setZoom(10);
        });

        moveToSubMenu.addItem("Moscow", e -> {
            Coordinate coordinate = Coordinate.fromLonLat(37.617298, 55.755825);
            map.getView().setCenter(coordinate);
            map.getView().setZoom(10);
        });

        moveToSubMenu.addItem("New York", e -> {
            Coordinate coordinate = Coordinate.fromLonLat(-74.005974, 40.712776);
            map.getView().setCenter(coordinate);
            map.getView().setZoom(10);
        });

        moveToSubMenu.addItem("Rio de Janeiro", e -> {
            Coordinate coordinate = Coordinate.fromLonLat(-43.2093727, -22.9110137);
            map.getView().setCenter(coordinate);
            map.getView().setZoom(10);
        });

        // tag::snippet2[]
        // Add menu items for zooming
        menuBar.addItem(zoomInIcon, e -> {
            float zoom = map.getView().getZoom();
            map.getView().setZoom(zoom + 1);
        });
        menuBar.addItem(zoomOutIcon, e -> {
            float zoom = map.getView().getZoom();
            map.getView().setZoom(zoom - 1);
        });
        // end::snippet2[]
        add(menuBar);
        setPadding(false);
    }

    public static class Exporter extends DemoExporter<MapViewport> {} // hidden-source-line
}
