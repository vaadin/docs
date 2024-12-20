package com.vaadin.demo.component.dashboard;

import com.vaadin.flow.component.dashboard.Dashboard;
import com.vaadin.flow.component.html.Div;

public class DashboardInternationalisation extends Div {
    public DashboardInternationalisation() {
        Dashboard dashboard = new Dashboard();
        // tag::snippet[]
        Dashboard.DashboardI18n germanI18n = new Dashboard.DashboardI18n();
        germanI18n.setSelectSection("Abschnitt auswählen");
        germanI18n.setSelectWidget("Widget auswählen");
        germanI18n.setRemove("Entfernen");
        germanI18n.setResize("Größe ändern");
        germanI18n.setResizeApply("Größenänderung anwenden");
        germanI18n.setResizeShrinkWidth("Breite verkleinern");
        germanI18n.setResizeGrowWidth("Breite vergrößern");
        germanI18n.setResizeShrinkHeight("Höhe verkleinern");
        germanI18n.setResizeGrowHeight("Höhe vergrößern");
        germanI18n.setMove("Verschieben");
        germanI18n.setMoveApply("Verschieben anwenden");
        germanI18n.setMoveBackward("Nach hinten verschieben");
        germanI18n.setMoveForward("Nach vorne verschieben");

        dashboard.setI18n(germanI18n);
        // end::snippet[]
        add(dashboard);
    }
}
