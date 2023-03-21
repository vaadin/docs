import { expect, use } from '@esm-bundle/chai';
import { render } from '@testing-library/react';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Foo from './Foo.js';

use(sinonChai)

// tag::snippet[]
describe('Foo', () => {
  it('renders correctly', () => {
    const element = render(<Foo></Foo>).container.children[0];
    expect(element).to.have.html(`<section><header>Bar</header></section>`);
  });

  it('sets the title', () => {
    const element = render(<Foo title="FooBar"></Foo>).container.children[0];
    expect(element).to.have.html(`<section><header>FooBar</header></section>`);
  });

  it('calls listener if clicked', () => {
    const onClick = sinon.spy();
    const element = render(<Foo onClick={onClick}></Foo>).container.children[0];
    element.querySelector('button')?.dispatchEvent(new PointerEvent('click'));
    expect(onClick).to.be.calledOnce;
  });
});
// end::snippet[]
