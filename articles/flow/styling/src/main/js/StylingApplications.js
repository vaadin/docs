// tutorial::../documentation-themes/styling-applications.asciidoc

// tag::image[]
const image = document.createElement('img');
img.setAttribute('src', '/my-image.png');
img.setAttribute('alt', 'Alternative text');
// end::image[]

// tag::vaadin-icons[]
const edit = document.createElement('iron-icon');
edit.setAttribute('icon', 'vaadin:edit');

const close = document.createElement('iron-icon');
close.setAttribute('icon', 'vaadin:close');
// end::vaadin-icons[]

// tag::lumo-icon[]
const edit = document.createElement('iron-icon');
edit.setAttribute('icon', 'lumo:clock');
// end::lumo-icon[]
