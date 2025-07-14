package com.vaadin.demo.component.markdown;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.markdown.Markdown;
import com.vaadin.flow.router.Route;

@Route("markdown-basic")
public class MarkdownBasic extends Div {

    public MarkdownBasic() {
        // tag::snippet[]
        String markdownText = """
                ## Rich Text Formatting

                You can create **bold text**, *italicized text*, and `inline code` with simple Markdown syntax.
                You can also ~~strike through~~ text when needed.

                ## Lists

                ### Ordered List:
                1. First item
                2. Second item
                3. Third item with **bold text**

                ### Unordered List:
                - Fruits
                    - Apples 🍎
                    - Bananas 🍌
                    - Oranges 🍊
                - Vegetables
                    - Carrots
                    - Broccoli

                ## Links & Quotes

                > Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.

                [Visit Vaadin website](https://vaadin.com) | [Learn more about Markdown](https://www.markdownguide.org/)
                """;

        Markdown markdown = new Markdown(markdownText);
        add(markdown);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<MarkdownBasic> { // hidden-source-line
    } // hidden-source-line
}
