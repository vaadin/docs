import { LitElement, html, customElement } from 'lit-element';

@customElement('my-button')
class MyButton extends LitElement {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  connectedCallback() {
    this.addEventListener('click', this.onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick);
  }

  render() {
    return html`<button>Some button</button>`;
  }

  private onClick() {
    console.log('I am clicked');
  }
}

export default MyButton;
