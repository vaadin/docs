package com.vaadin.flow.tutorial.dnd;

import com.vaadin.flow.component.dnd.DropEffect;
import com.vaadin.flow.component.dnd.DropTarget;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("dnd/drop-target.asciidoc")
public class DropTargetSample {

    public void dropTargetSample() {
        VerticalLayout first = new VerticalLayout();
        VerticalLayout second = new VerticalLayout();

        // makes first layout an active drop target
        DropTarget<VerticalLayout> dropTarget = DropTarget.create(first);

        // provides access to drop target API for second layout,
        // without setting it as an active drop target
        DropTarget<VerticalLayout> dropTarget2 = DropTarget.configure(second);
        // change previously set settings
        dropTarget2.setDropEffect(DropEffect.NONE);
    }

    public void dropListenerSample() {
        Div box = new Div();
        box.setWidth("300px");
        box.setHeight("300px");

        DropTarget<Div> dropTarget = DropTarget.create(box);

        dropTarget.addDropListener(event -> {
            // move the dragged component to inside the drop target component
            if (event.getDropEffect() == DropEffect.MOVE) {
                // the drag source is available only if the dragged component is from
                // the same UI as the drop target
                event.getDragSourceComponent().ifPresent(box::add);

                event.getDragData().ifPresent(data -> {
                    // the server side drag data is available if it has been set and the
                    // component was dragged from the same UI as the drop target
                });
            }
        });
    }

    public class Column extends VerticalLayout implements DropTarget<VerticalLayout> {

        public Column() {
            // allow drops by default
            setActive(true);
        }
        // all drop target methods have default implementations
    }
}
