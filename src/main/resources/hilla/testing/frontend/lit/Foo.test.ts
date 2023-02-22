import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { FooEventData } from './Foo.js';

// tag::snippet[]
describe('Foo', () => {
  it('should render', async () => {
    const element = await fixture(html`<x-foo></x-foo>`);
    expect(element).shadowDom.to.be.equal('<button>Bar</button>');
  });

  it('should provide "title" property', async () => {
    const element = await fixture(html`<x-foo .title="Baz"></x-foo>`);
    expect(element).shadowDom.to.be.equal('<button>Baz</button>');
  });

  it('should dispatch an event on click', async (done) => {
    const listener = (e: CustomEvent<FooEventData>) => {
      expect(e.detail.value).to.be.equal('Bar is clicked');
      done();
    };
    const element = await fixture(html`<x-foo @foo-click="${listener}"></x-foo>`);
    element.shadowRoot?.querySelector('button')?.dispatchEvent(new PointerEvent('click'));
  });
});
// end::snippet[]
