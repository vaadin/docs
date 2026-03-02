package com.vaadin.demo.component.icons;

import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("icon-basic")
public class IconBasic extends Div {

    public IconBasic() {
        HorizontalLayout layout = new HorizontalLayout();
        layout.setSpacing(true);
        layout.setAlignItems(FlexComponent.Alignment.CENTER);

        // tag::snippet[]
        Icon pictureIcon = VaadinIcon.PICTURE.create();
        Icon phoneIcon = VaadinIcon.PHONE.create();

        layout.add(pictureIcon, phoneIcon);
        // end::snippet[]
        add(layout);
    }

    public static class Exporter extends DemoExporter<IconBasic> { // hidden-source-line
    } // hidden-source-line
}
