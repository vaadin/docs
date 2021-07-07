package com.vaadin.demo.component.button;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.dom.DomEventListener;

@Tag("fake-progress-bar")
@JsModule("demo/component/button/fake-progress-bar.ts")
public class FakeProgressBar extends Component {
    public void start() {
        this.getElement().callJsFunction("start");
    }

    public void addProgressEndListener(DomEventListener listener) {
        this.getElement().addEventListener("progress-end", listener);
    }
}