package com.vaadin.flow.tutorial.dnd;

import java.util.stream.Stream;

import com.vaadin.flow.component.HasStyle;
import com.vaadin.flow.component.dnd.DragSource;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.dom.Element;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("dnd/drag-source.asciidoc")
public class DragSourceSample extends Div {

    public enum Land {
        Spade;
    }

    public static class Card {
        public Card(int i, Land land) {
        }

        public Land getLand() {
            return null;
        }
    }

    public void dragSourceSample() {
        Div box1 = new Div();
        Div box2 = new Div();

        // make box 1 draggable and store reference to the configuration object
        DragSource<Div> box1DragSource = DragSource.create(box1);

        // access box 2 drag related configuration object without making it draggable
        DragSource<Div> box2DragSource = DragSource.configure(box2);

        // later make box 2 draggable
        box2DragSource.setDraggable(true);

        add(box1, box2);

        // continuing from the previous example, CardComponent implements DragSource
        CardComponent card1 = new CardComponent();
        CardComponent card2 = new CardComponent();

        card1.setDragData("Queen of Hearts");
        card2.setDragData(new Card(11, Land.Spade)); // the data can be any object

        // continuing from the previous example with CardComponent
        card1.addDragStartListener(event -> {
            // highlight suitable drop targets in the UI
            getVisibleCards().forEach(target -> {
                Card targetCard = target.getCard();
                if (targetCard.getLand() == ((Card) card1.getDragData()).getLand()
                        && target != card1) {
                    target.addClassName("possible-drop-zone");
                }
            });
        });

        card1.addDragEndListener(event -> {
            getVisibleCards().forEach(target -> target.removeClassName("possible-drop-zone"));
            // NOTE: The following is always FALSE for Edge and Safari !!!
            if (event.isSuccessful()) {
                // better to put logic for successful drop into DropEvent for the
                // DropTarget because of the above
            }
        });
    }

    public Stream<CardComponent> getVisibleCards() {
        return null;
    }

    public class CardComponent extends Div implements DragSource<CardComponent>, HasStyle {
        public CardComponent() {
            // all cards will be draggable by default
            setDraggable(true);
        }
        // all DragSource methods have default implementations

        public Card getCard() {
            return null;
        }

        ;
    }

    /* NOTE: RouteItem is a made up custom component, not a core Vaadin component. */
    public class DraggableRouteItem extends RouteItem implements DragSource<RouteItem> {
        private Icon dragHandle = VaadinIcon.MENU.create();

        public DraggableRouteItem(String destination) {
            super(destination);
            add(dragHandle);
        }

        // Instead of allowing the whole item to be draggable, only allow dragging
        // from the icon.
        @Override
        public Element getDraggableElement() {
            return dragHandle.getElement();
        }
    }

    public class RouteItem extends Div {
        public RouteItem(String destination) {
        }

        ;
    }

}
