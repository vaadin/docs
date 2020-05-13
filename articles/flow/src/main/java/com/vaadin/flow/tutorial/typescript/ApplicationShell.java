/*
 * Copyright 2000-2018 Vaadin Ltd.
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
package com.vaadin.flow.tutorial.typescript;

import java.util.Collections;
import java.util.Set;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.component.page.BodySize;
import com.vaadin.flow.component.page.Inline;
import com.vaadin.flow.component.page.Inline.Position;
import com.vaadin.flow.component.page.Inline.Wrapping;
import com.vaadin.flow.component.page.Meta;
import com.vaadin.flow.component.page.Push;
import com.vaadin.flow.component.page.TargetElement;
import com.vaadin.flow.component.page.Viewport;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.server.AppShellSettings;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.server.communication.IndexHtmlRequestListener;
import com.vaadin.flow.server.communication.IndexHtmlResponse;
import com.vaadin.flow.shared.communication.PushMode;
import com.vaadin.flow.shared.ui.Transport;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("advanced/tutorial-modifying-the-bootstrap-page.asciidoc")
public class ApplicationShell {

    @Viewport("width=device-width, initial-scale=1")
    @PageTitle("A cool vaadin app")
    @BodySize(height = "100vh", width = "100vw")
    @Meta(name = "author", content = "bunny")
    @Inline(wrapping = Wrapping.AUTOMATIC,
            position = Position.APPEND,
            target = TargetElement.BODY,
            value = "custom.html")
    @PWA(name = "Cool Vaadin App", shortName = "my-app")
    @Push(value = PushMode.MANUAL, transport = Transport.WEBSOCKET)
    public class AppShell implements AppShellConfigurator {

        @Override
        public void configurePage(AppShellSettings settings) {
            settings.setViewport("width=device-width, initial-scale=1");
            settings.setPageTitle("A cool vaadin app");
            settings.setBodySize("100vw", "100vh");
            settings.addMetaTag("author", "bunny");
            settings.addFavIcon("icon", "icons/icon-192.png", "192x192");
            settings.addLink("shortcut icon", "icons/favicon.ico");

            settings.addInlineFromFile(
                    TargetElement.BODY,
                    Position.APPEND,
                    "custom.html",
                    Wrapping.AUTOMATIC);
            settings.addInlineWithContents(Position.PREPEND,
                    "console.log(\"foo\");", Wrapping.JAVASCRIPT);

            settings.getLoadingIndicatorConfiguration()
                    .ifPresent(indicator -> indicator.setApplyDefaultTheme(false));
            settings.getLoadingIndicatorConfiguration()
                    .ifPresent(indicator -> indicator.setSecondDelay(700000));
            settings.getPushConfiguration()
                    .ifPresent(push -> push.setPushMode(PushMode.AUTOMATIC));
            settings.getReconnectDialogConfiguration()
                    .ifPresent(dialog -> dialog.setDialogModal(true));
        }
    }

    public class MyIndexHtmlRequestListener implements
            IndexHtmlRequestListener {

        @Override
        public void modifyIndexHtmlResponse(
                IndexHtmlResponse indexHtmlResponse) {

            Document document = indexHtmlResponse.getDocument();
            Element body = document.body();
            body.classNames(computeBodyClassNames());
        }

        private Set<String> computeBodyClassNames() {
            // Introduce some logic to dynamically change the body class
            return Collections.singleton("my-className");
        }
    }
}
