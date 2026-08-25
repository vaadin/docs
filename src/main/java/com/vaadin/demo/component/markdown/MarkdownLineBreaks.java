package com.vaadin.demo.component.markdown;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.markdown.Markdown;
import com.vaadin.flow.router.Route;

@Route("markdown-line-breaks")
public class MarkdownLineBreaks extends Div {

    public MarkdownLineBreaks() {
        // tag::snippet[]
        String markdownText = """
                Deploy checklist for tomorrow:
                Run the test suite
                Bump the version number
                Tag the release
                """;

        Markdown markdown = new Markdown(markdownText);
        markdown.setLineBreaks(true);
        add(markdown);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<MarkdownLineBreaks> { // hidden-source-line
    } // hidden-source-line
}
