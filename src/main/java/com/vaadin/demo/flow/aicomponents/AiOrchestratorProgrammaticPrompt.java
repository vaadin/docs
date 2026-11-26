package com.vaadin.demo.flow.aicomponents;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.ai.orchestrator.AiOrchestrator;
import com.vaadin.flow.component.ai.provider.LlmProvider;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.messages.MessageList;
import com.vaadin.flow.router.Route;

@Route("ai-components-programmatic-prompt")
public class AiOrchestratorProgrammaticPrompt extends Div {

    public AiOrchestratorProgrammaticPrompt() {
        // tag::snippet[]
        MessageList messageList = new MessageList();
        messageList.setMarkdown(true);

        LlmProvider provider = getLlmProvider();

        AiOrchestrator orchestrator = AiOrchestrator
                .builder(provider, "You are a helpful assistant.")
                .withMessageList(messageList).build();

        Button button = new Button("Summarize",
                event -> orchestrator.prompt("Summarize the key features"));

        add(button, messageList);
        // end::snippet[]

        com.vaadin.demo.component.messages.LLMClient.initPolling(messageList); // hidden-source-line
    }

    private LlmProvider getLlmProvider() {
        return new MockLlmProvider();
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<AiOrchestratorProgrammaticPrompt> { // hidden-source-line
    } // hidden-source-line
}
