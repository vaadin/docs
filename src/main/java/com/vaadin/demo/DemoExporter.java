package com.vaadin.demo;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.WebComponentExporter;
import com.vaadin.flow.component.webcomponent.WebComponent;
import com.vaadin.flow.internal.ReflectTools;
import com.vaadin.flow.theme.Theme;

import java.time.Duration;

@Theme("docs")
public abstract class DemoExporter<T extends Component> extends WebComponentExporter<T> {

  private static boolean initializedPoll;

  public DemoExporter() {
    super("");

    try {
      // Generate the exported Web Component tag name from <T>'s class name
      final Class<T> componentClass = (Class<T>) ReflectTools.getGenericInterfaceType(this.getClass(),
          WebComponentExporter.class);
      final String generatedTag = componentClass.getSimpleName().replaceAll("([a-z])([A-Z]+)", "$1-$2").toLowerCase();
      ReflectTools.setJavaFieldValue(this, WebComponentExporter.class.getDeclaredField("tag"), generatedTag + "-wc");
    } catch (final Exception e) {
      e.printStackTrace();
    }
  }

  @Override
  protected void configureInstance(final WebComponent<T> webComponent, final T demo) {
    if (!initializedPoll) {
      UI.getCurrent().setPollInterval((int) Duration.ofMinutes(20).toMillis());
      UI.getCurrent().addPollListener(e -> emitUpdateTimestamp());
      initializedPoll = true;
    }
    emitUpdateTimestamp();
  }

  private void emitUpdateTimestamp() {
    UI.getCurrent().getPage().executeJs("window.dispatchEvent(new Event('update-timestamp'))");
  }
}

