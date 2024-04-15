import { withPrefix } from 'gatsby';

async function addAssistant() {
  // Make sure the web components reqruied by the assistant are defined before proceeding
  await import('./docs-assistant-imports');

  // Add the assistant to the page
  const docsAssistant = document.createElement('docs-assistant');
  docsAssistant.hidden = true;
  document.body.appendChild(docsAssistant);

  // Wait for the search button to be available
  const searchButton: HTMLElement = await new Promise((resolve) => {
    const interval = setInterval(() => {
      const searchButton = document.querySelector<HTMLButtonElement>('#docs-search-btn');
      if (searchButton && searchButton.parentElement) {
        clearInterval(interval);
        resolve(searchButton.parentElement);
      }
    }, 100);
  });

  // Crate the "Ask Assistant" button next to the search button
  const docsAssistantButton = document.createElement('button');
  docsAssistantButton.id = 'docs-assistant-btn';
  searchButton.insertAdjacentElement('beforebegin', docsAssistantButton);
  docsAssistantButton.textContent = 'Ask Assistant';
  docsAssistantButton.addEventListener('click', () => {
    docsAssistant.hidden = !docsAssistant.hidden;
  });
}

function loadAssistant() {
  // @ts-expect-error Prevent assistant bundle from registering any web components
  window.__vaadinBlockDefine = true;

  const script = document.createElement('script');
  script.src = withPrefix('/docs-assistant/VAADIN/docs-assistant-wc.js');
  script.type = 'module';
  script.onload = addAssistant;

  document.head.appendChild(script);
}

loadAssistant();
