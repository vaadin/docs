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
                Hi Maria,
                Your order shipped this morning.
                It should arrive by Thursday.

                Best regards,
                Tom
                """;

        Markdown markdown = new Markdown(markdownText);
        markdown.setLineBreaks(true);
        // end::snippet[]
        add(markdown);
    }

    public static class Exporter extends DemoExporter<MarkdownLineBreaks> { // hidden-source-line
    } // hidden-source-line
}
