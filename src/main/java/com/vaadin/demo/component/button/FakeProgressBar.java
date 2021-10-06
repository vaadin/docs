package com.vaadin.demo.component.button;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.dom.DomEventListener;

@Tag("fake-progress-bar")
public class FakeProgressBar extends Component {
    public void simulateProgress() {
        this.getElement().callJsFunction("simulateProgress");
    }

    public void addProgressEndListener(DomEventListener listener) {
        this.getElement().addEventListener("progress-end", listener);
    }
}