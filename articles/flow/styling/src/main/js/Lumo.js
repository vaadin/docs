// tutorial::../documentation-themes/lumo/lumo-overview.asciidoc

// tag::imports[]
// Import the main style sheets which set all the
// global custom properties
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/typography.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/typography.js';
import '@vaadin/vaadin-lumo-styles/icons.js';
import '@vaadin/vaadin-lumo-styles/badges.js';
// end::imports[]

// tag::include[]
// Import the <custom-style> element from Polymer and include
// the style sheets in the global scope
import '@polymer/polymer/lib/elements/custom-style.js';

const style = document.createElement('custom-style');
style.innerHTML = `<style include="lumo-color lumo-typography"></style>`;
document.head.appendChild(style);
// end::include[]
