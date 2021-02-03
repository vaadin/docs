package com.vaadin.flow.tutorial.theme;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.flow.theme.NoTheme;
import com.vaadin.flow.theme.Theme;
import com.vaadin.flow.theme.lumo.Lumo;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("theme/using-component-themes.asciidoc")
public class ReadyMadeThemes {
    @Route(value = "")
    @Theme(Lumo.class) // can be omitted for Lumo
    public class Application extends Div {
    }

    @Theme(MyTheme.class)
    public class MainLayout extends Div implements RouterLayout {
    }

    @Route(value = "", layout = MainLayout.class)
    public class HomeView extends Div {
    }

    @Route(value = "blog", layout = MainLayout.class)
    public class BlogPost extends Div {
    }

    @Route(value = "")
    @NoTheme
    public class UnThemedApplication extends Div {
    }

    @Route(value = "")
    @Theme(value = MyTheme.class, variant = "large")
    public class LargeThemedApplication extends Div {
    }

    @Route(value = "")
    @Theme(value = Lumo.class, variant = Lumo.DARK)
    public class DarkApplication extends Div {
    }

    public class MyTheme extends Lumo {
    }

    public void buttonVariant() {
        Button button = new Button("Themed button");
        button.getElement().setAttribute("theme", "contrast primary");
    }
}
