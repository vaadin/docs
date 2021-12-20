import { SelectValueChangedEvent } from '@vaadin/select';
import '@vaadin/button';
import '@vaadin/select';
import '@vaadin/checkbox';
import '@vaadin/checkbox-group';
import '@vaadin/notification';
import { html, LitElement, render } from 'lit';
import { guard } from 'lit/directives/guard';
import { customElement, state } from 'lit/decorators';
import { Checkbox } from '@vaadin/checkbox';
import { CheckboxGroupValueChangedEvent } from '@vaadin/checkbox-group';
import { Notification } from '@vaadin/notification';

const VAADIN_VERSIONS: Record<string, string> = {
  14: '14.8.0',
  15: '15.0.6',
  16: '16.0.5',
  17: '17.0.11',
  18: '18.0.7',
  19: '19.0.9',
  20: '20.0.8',
  21: '21.0.9',
  22: '22.0.1',
};

const SIMPLE_VERSIONS: string[] = [];
for (const k in VAADIN_VERSIONS) {
  SIMPLE_VERSIONS.push(k);
}

const DEFAULT_FROM = '14';
const DEFAULT_TO = '22';

@customElement('upgrade-tool')
export default class UpgradeTool extends LitElement {
  @state()
  private fromVersion = '';
  @state()
  private toVersion = '';
  @state()
  private frameworkValue = ['flow'];
  @state()
  private extraSettingsValue = ['spring'];

  private isFlow = true;
  private isFusion = false;
  private isSpring = true;
  private isTypeScript = true;

  render() {
    return html`
      <div>
        <h2>Select your Vaadin versions:</h2>
        <div style="margin-bottom: 10px">${this.createSelectComponents()}</div>
        <div style="margin-bottom: 10px">
          <vaadin-checkbox-group
            label="Framework"
            id="framework-checkbox-group"
            .value="${this.frameworkValue}"
            @value-changed=${this.frameworkChanged}
            theme="horizontal"
          >
            <vaadin-checkbox value="flow" label="Flow" id="flow-checkbox"></vaadin-checkbox>
            <vaadin-checkbox value="fusion" label="Fusion" id="fusion-checkbox"></vaadin-checkbox>
          </vaadin-checkbox-group>
        </div>
        <div>
          <vaadin-checkbox-group
            label="I use"
            id="extra-settings-checkbox-group"
            .value="${this.extraSettingsValue}"
            @value-changed=${this.extraSettingsChanged}
            theme="horizontal"
          >
            <vaadin-checkbox
              value="spring"
              label="Spring Boot"
              id="spring-checkbox"
              ?disabled=${this.isFusion || (!this.isFusion && !this.isFlow)}
            ></vaadin-checkbox>
            <vaadin-checkbox
              value="typescript"
              label="TypeScript-based views"
              id="typescript-checkbox"
              ?disabled=${this.isFusion || (!this.isFusion && !this.isFlow)}
            ></vaadin-checkbox>
          </vaadin-checkbox-group>
        </div>
        <vaadin-button
          theme="primary"
          style="width: fit-content; margin-top: 30px; margin-bottom: 30px"
          @click=${this.showUpdateInstructions}
          >Show update instructions!</vaadin-button
        >
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }

  private showUpdateInstructions() {
    this.hideOldInstructions();

    const elementsToShow: HTMLElement[] = [];

    if (this.isFlow || this.isFusion) {
      elementsToShow.push(...this.getElementsByClassname('all'));
    } else {
      Notification.show('Please select a framework!');
    }

    if (this.isSpring) {
      elementsToShow.push(...this.getDetailedInstructionElements('spring'));
    }

    if (this.isTypeScript) {
      elementsToShow.push(...this.getDetailedInstructionElements('typescript'));
    }

    if (this.isFlow) {
      elementsToShow.push(...this.getDetailedInstructionElements('flow'));
    }

    if (this.isFusion) {
      elementsToShow.push(...this.getDetailedInstructionElements('fusion'));
    }

    elementsToShow.forEach((e) => {
      if (!e) {
        return;
      }
      this.updateVaadinVersionsInElement(e);
      e.style.setProperty('display', 'block');
    });
  }

  private getElementsByClassname(classname: string) {
    return <HTMLElement[]>[...document.querySelectorAll('.' + classname)];
  }

  private getDetailedInstructionElements(target: string): HTMLElement[] {
    const elementsToShow: HTMLElement[] = [];
    elementsToShow.push(...this.getElementsByClassname(target + '-all'));

    let suffix = `-${this.fromVersion}-${this.toVersion}`;
    const elements = this.getElementsByClassname(target + suffix);

    if (elements.length > 0) {
      elements.push(...this.getExtraInstructionsElements(target, suffix));
      elementsToShow.push(...elements);
    } else {
      let idx = SIMPLE_VERSIONS.indexOf(this.fromVersion);
      const endIdx = SIMPLE_VERSIONS.indexOf(this.toVersion);

      for (idx; idx < endIdx; idx++) {
        suffix = `-${SIMPLE_VERSIONS[idx]}-${SIMPLE_VERSIONS[idx + 1]}`;
        elements.push(...this.getElementsByClassname(target + suffix));
        if (elements.length > 0) {
          elements.push(...this.getExtraInstructionsElements(target, suffix));
          elementsToShow.push(...elements);
        }
      }
    }
    return elementsToShow;
  }

  getExtraInstructionsElements(framework: string, suffix: string) {
    const elements: HTMLElement[] = [];
    if (this.isSpring)
      elements.push(...this.getElementsByClassname(framework + '-spring' + suffix));
    if (this.isTypeScript)
      elements.push(...this.getElementsByClassname(framework + '-typescript' + suffix));

    return elements;
  }

  private hideOldInstructions() {
    document
      .querySelectorAll(
        "[class*='all'], [class*='flow'], [class*='fusion'], [class*='spring'], [class*='typescript']"
      )
      .forEach((elem) => (<HTMLElement>elem).style.setProperty('display', 'none'));
  }

  private updateVaadinVersionsInElement(e: HTMLElement) {
    e.querySelectorAll('.vaadin-to-version-simple').forEach(
      (elem) => ((<HTMLElement>elem).innerText = `${this.toVersion}`)
    );
    e.querySelectorAll('.vaadin-to-version-full').forEach(
      (elem) => ((<HTMLElement>elem).innerText = `${VAADIN_VERSIONS[this.toVersion]}`)
    );
    e.querySelectorAll('.vaadin-from-version-simple').forEach(
      (elem) => ((<HTMLElement>elem).innerText = `${this.fromVersion}`)
    );
    e.querySelectorAll('.vaadin-from-version-full').forEach(
      (elem) => ((<HTMLElement>elem).innerText = `${VAADIN_VERSIONS[this.fromVersion]}`)
    );
  }

  private createSelectComponents() {
    const fromVersionList = SIMPLE_VERSIONS.slice(0, -1);
    const toVersionList = SIMPLE_VERSIONS.slice(1);
    return html`<vaadin-select
        label="From"
        id="from-select"
        style="width: fit-content; margin-right: 10px"
        value=${this.fromVersion}
        @value-changed=${this.fromVersionChanged}
        .renderer="${guard(
          [],
          () => (root: HTMLElement) =>
            render(
              html`
                <vaadin-list-box>
                  ${fromVersionList.map((v) => html`<vaadin-item value="${v}">${v}</vaadin-item>`)}
                </vaadin-list-box>
              `,
              root
            )
        )}"
      ></vaadin-select>
      <vaadin-select
        label="To"
        id="to-select"
        value=${this.toVersion}
        @value-changed=${this.toVersionChanged}
        .renderer="${guard(
          [],
          () => (root: HTMLElement) =>
            render(
              html`
                <vaadin-list-box>
                  ${toVersionList.map(
                    (v) =>
                      html`<vaadin-item value="${v}" ?hidden=${v <= this.fromVersion}
                        >${v}</vaadin-item
                      >`
                  )}
                </vaadin-list-box>
              `,
              root
            )
        )}"
      ></vaadin-select>`;
  }

  private fromVersionChanged(e: SelectValueChangedEvent) {
    const val = e.detail.value;
    if (parseInt(val) >= parseInt(this.toVersion)) {
      const idx = SIMPLE_VERSIONS.indexOf(val);
      this.toVersion = SIMPLE_VERSIONS[idx + 1];
    }
    this.fromVersion = val;
  }

  private toVersionChanged(e: SelectValueChangedEvent) {
    this.toVersion = e.detail.value;
  }

  private frameworkChanged(e: CheckboxGroupValueChangedEvent) {
    const val = e.detail.value;
    this.frameworkValue = val;

    this.isFlow = val.includes('flow');

    if (this.frameworkValue.includes('fusion')) {
      this.isFusion = true;
      this.isSpring = true;
      this.isTypeScript = true;

      ['spring', 'typescript'].forEach((v) => {
        this.extraSettingsValue.indexOf(v) === -1 ? this.extraSettingsValue.push(v) : null;
        const checkbox = <Checkbox>document.getElementById(`${v}-checkbox`);
        checkbox.checked = true;
      });
    } else {
      this.isFusion = false;
    }
  }

  private extraSettingsChanged(e: CheckboxGroupValueChangedEvent) {
    const val = e.detail.value;
    this.extraSettingsValue = val;

    this.isSpring = val.includes('spring') || this.isFusion;
    this.isTypeScript = val.includes('typescript') || this.isFusion;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
    this.fromVersion = DEFAULT_FROM;
    this.toVersion = DEFAULT_TO;
  }
}
