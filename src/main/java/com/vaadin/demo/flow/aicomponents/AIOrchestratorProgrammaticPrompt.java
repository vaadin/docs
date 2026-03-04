package com.vaadin.demo.flow.aicomponents;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.ai.orchestrator.AIOrchestrator;
import com.vaadin.flow.component.ai.provider.LLMProvider;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.messages.MessageList;
import com.vaadin.flow.router.Route;

@Route("ai-components-programmatic-prompt")
public class AIOrchestratorProgrammaticPrompt extends Div {

    public AIOrchestratorProgrammaticPrompt() {
        // tag::snippet[]
        MessageList messageList = new MessageList();

        LLMProvider provider = getLLMProvider();

        AIOrchestrator orchestrator = AIOrchestrator
                .builder(provider, "You are a helpful assistant.")
                .withMessageList(messageList).build();

        Button button = new Button("Summarize",
                event -> orchestrator.prompt("Summarize the key features"));

        add(button, messageList);
        // end::snippet[]

        com.vaadin.demo.component.messages.LLMClient.initPolling(messageList); // hidden-source-line
    }

    private LLMProvider getLLMProvider() {
        return new MockLLMProvider();
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<AIOrchestratorProgrammaticPrompt> { // hidden-source-line
    } // hidden-source-line
}
