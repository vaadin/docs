package com.vaadin.demo.component.dashboard;

import com.vaadin.flow.component.confirmdialog.ConfirmDialog;
import com.vaadin.flow.component.dashboard.Dashboard;
import com.vaadin.flow.component.html.Div;

public class DashboardItemRemoval extends Div {

    public DashboardItemRemoval() {
        Dashboard dashboard = new Dashboard();
        // tag::snippet[]
        dashboard.setItemRemoveHandler(removeEvent -> {
            ConfirmDialog dialog = new ConfirmDialog();
            dialog.setHeader("Confirm removal");
            dialog.setText("Are you sure you want to remove this item?");
            dialog.setCancelable(true);
            dialog.addConfirmListener(e -> removeEvent.removeItem());
            dialog.open();
        });
        // end::snippet[]
        add(dashboard);
    }
}
