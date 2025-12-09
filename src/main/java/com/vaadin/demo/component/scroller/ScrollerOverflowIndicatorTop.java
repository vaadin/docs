package com.vaadin.demo.component.scroller;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.Unit;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.card.Card;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.markdown.Markdown;
import com.vaadin.flow.component.orderedlayout.Scroller;
import com.vaadin.flow.router.Route;

@Route("scroller-overflow-indicator-top")
public class ScrollerOverflowIndicatorTop extends Div {

    private static final String EVENT_DETAILS = """
**Date & Time**

Saturday, July 19, 2025
9:00 AM – 5:00 PM (PDT)

**About This Event**

Join us for a full day of inspiring talks, hands-on workshops, and networking opportunities with industry leaders. Whether you're a seasoned developer or just starting out, there's something for everyone.

**Schedule**

- **9:00 AM** – Registration & Breakfast
- **10:00 AM** – Opening Keynote
- **11:30 AM** – Breakout Sessions
- **1:00 PM** – Lunch & Networking
- **2:30 PM** – Afternoon Workshops
- **4:30 PM** – Closing Remarks & Raffle

**What to Bring**

- Photo ID for check-in
- Laptop (optional, for workshops)
- Business cards for networking

**Parking**

Free parking available in Lot B. Street parking is limited.

**Contact**

Questions? Email us at events@techconf.io
            """;

    public ScrollerOverflowIndicatorTop() {
        Card card = new Card();
        card.setMaxWidth(400, Unit.PIXELS);

        card.setTitle("Summer Tech Conference 2025");

        Markdown markdown = new Markdown(EVENT_DETAILS);

        // tag::snippet[]
        Scroller scroller = new Scroller(markdown);
        scroller.addThemeName("overflow-indicator-top");
        scroller.getStyle().set("--vaadin-scroller-padding-block", "1rem");
        // end::snippet[]
        scroller.setMaxHeight(300, Unit.PIXELS);

        card.add(scroller);

        Button addToCalendar = new Button("Add to calendar");
        card.addToFooter(addToCalendar);

        add(card);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<ScrollerOverflowIndicatorTop> { // hidden-source-line
    } // hidden-source-line
}
