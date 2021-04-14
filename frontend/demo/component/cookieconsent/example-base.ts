import { Constructor } from 'lit-element';

const ExampleMixin = <T extends Constructor<any>>(base: T) => {
  class ExampleBase extends base {
    firstUpdated() {
      const button = document.querySelector('.cc-dismiss');

      if (button) {
        button.addEventListener('click', this.onDismiss);
      }
    }

    disconnectedCallback() {
      const button = document.querySelector('.cc-dismiss');

      if (button) {
        button.removeEventListener('click', this.onDismiss);
      }
    }

    private onDismiss() {
      setTimeout(() => {
        document.cookie = `cookieconsent_status=; Path=/; expires=${new Date(1970, 1, 1)}`;
      }, 500);
    }
  }

  return ExampleBase;
};

export default ExampleMixin;
