import { expect } from "@esm-bundle/chai";
import { fixture } from "@open-wc/testing";
import { FooEventData } from "Frontend/demo/fusion/testing/Foo.js";
import { html } from "lit";

// tag::snippet[]
describe('Foo', () => {
  it('should render', async () => {
    const element = await fixture(html`<x-foo></x-foo>`);
    expect(element).shadowDom.to.equal('<button>Bar</button>');
  });

  it('should provide "title" property', async () => {
    const element = await fixture(html`<x-foo .title="Baz"></x-foo>`);
    expect(element).shadowDom.to.equal('<button>Baz</button>');
  });

  it('should dispatch an event on click', async (done) => {
    const listener = (e: CustomEvent<FooEventData>) => {
      expect(e.detail.value).to.equal("Bar is clicked");
      done();
    };
    const element = await fixture(html`<x-foo @foo-click="${listener}"></x-foo>`);
    element.shadowRoot?.querySelector('button')?.dispatchEvent(new PointerEvent('click'));
  });
});
// end::snippet[]
