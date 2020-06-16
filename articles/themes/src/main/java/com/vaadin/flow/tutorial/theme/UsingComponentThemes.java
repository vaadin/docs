/*
 * Copyright 2000-2020 Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.vaadin.flow.tutorial.theme;

import java.util.Arrays;
import java.util.List;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.flow.theme.AbstractTheme;
import com.vaadin.flow.theme.NoTheme;
import com.vaadin.flow.theme.Theme;
import com.vaadin.flow.theme.lumo.Lumo;
import com.vaadin.flow.theme.material.Material;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("../documentation-themes/theme-variants.asciidoc")
public class UsingComponentThemes {

    @Route(value = "")
    public class DefaultLumoApplication extends Div {
    }

    // tag::lumo[]
    @Route(value = "")
    @Theme(value = Lumo.class)
    public class LumoApplication extends Div {
    }
    // end::lumo[]

    // tag::material[]
    @Route(value = "")
    @Theme(value = Material.class)
    public class MaterialApplication extends Div {
    }
    // end::material[]
    //

    @Route(value = "")
    @Theme(MyTheme.class)
    public class MyApplication extends Div {
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

    // tag::notheme[]
    @Route(value = "")
    @NoTheme
    public class UnThemedApplication extends Div {
    }
    // end::notheme[]

    @Route(value = "")
    @Theme(value = MyTheme.class, variant = "large")
    public class LargeThemedApplication extends Div {
    }

    @Route(value = "")
    // tag::lumo-dark[]
    @Theme(value = Lumo.class, variant = Lumo.DARK)
    // end::lumo-dark[]
    public class DarkApplication extends Div {
    }

    @Route(value = "")
    // tag::material-dark[]
    @Theme(value = Material.class, variant = Material.DARK)
    // end::material-dark[]
    public class DarkMaterialApplication extends Div {
    }

    public class Button extends Component {
        public Button(String string) {
        }

        public void addThemeVariants(ButtonVariant... vars) {
        }

        public List<String> getThemeNames() {
            return null;
        }
    }

    {
        // tag::themed-button[]
        // Using the high-level HasTheme API
        Button button = new Button("Themed button");
        button.addThemeVariants(ButtonVariant.LUMO_PRIMARY,
                ButtonVariant.LUMO_SMALL);
        // end::themed-button[]
    }
    {
        // tag::themed-button2[]
        Button button = new Button("Themed button");
        button.getThemeNames().addAll(Arrays.asList("primary", "small"));
        // end::themed-button2[]
    }
    {
        // tag::themed-button3[]
        // Using the low-level Element API
        Button button = new Button("Themed button");
        String themeAttributeName = "theme";
        String oldValue = button.getElement().getAttribute(themeAttributeName);
        String variantsToAdd = "primary small";
        button.getElement().setAttribute(themeAttributeName,
                oldValue == null || oldValue.isEmpty() ? variantsToAdd
                        : ' ' + variantsToAdd);
        // end::themed-button3[]
    }
    {
        // tag::combobox-variant[]
        ComboBox comboBox = new ComboBox();
        comboBox.getElement().setAttribute("theme", TextFieldVariant.LUMO_SMALL.getVariantName());
        // end::combobox-variant[]
    }

    // tag::lumo-compact[]
    @JsModule("@vaadin/vaadin-lumo-styles/presets/compact.js")
    @Theme(Lumo.class)
    // end::lumo-compact[]
    public class CompactMainLayout extends Div implements RouterLayout {
    }

    @JsModule("@vaadin/vaadin-lumo-styles/color.js")
    public class MyTheme implements AbstractTheme {
        @Override
        public String getBaseUrl() {
            return "/src/";
        }

        @Override
        public String getThemeUrl() {
            return "/theme/myTheme/";
        }
    }
}
