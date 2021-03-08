// tutorial::../documentation-themes/lumo/lumo-overview.asciidoc

// tag::imports[]
// Import the main style sheets which set all the
// global custom properties
import '@vaadin/vaadin-material-styles/color.js';
import '@vaadin/vaadin-material-styles/typography.js';
// end::imports[]

// tag::include[]
// Import the <custom-style> element from Polymer and include
// the style sheets in the global scope
import '@polymer/polymer/lib/elements/custom-style.js';

const style = document.createElement('custom-style');
style.innerHTML = `<style include="material-color material-typography"></style>`;
document.head.appendChild(style);
// end::include[]
