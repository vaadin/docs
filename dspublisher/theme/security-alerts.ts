// A signup form for security alert emails, placed on the docs home page with
// <docs-security-alerts></docs-security-alerts> (see articles/index.adoc).
// Submissions go to a HubSpot form through the HubSpot Forms API.
import { html, LitElement, nothing, svg } from 'lit';
import { state } from 'lit/decorators.js';

const SIGNUP_URL =
  'https://api.hsforms.com/submissions/v3/integration/submit/1840687/969cc021-0410-4622-88da-e1366b19ef94';
const SUBSCRIPTION_TYPE_ID = 922129;
const OFFER_SOURCE = 'Get Security Alerts';
const PRIVACY_POLICY_URL = 'https://vaadin.com/privacy-policy';

// Shown under the form, and recorded with the consent in HubSpot, so the two
// have to say the same thing
const CONSENT_TEXT = 'Unsubscribe anytime.';

const EMAIL_PATTERN = '[^@\\s]+@[^@\\s]+\\.[a-zA-Z]{2,}';
// No period at the end, as it could read as part of the address
const EMAIL_ERROR = 'Enter a valid email address, e.g. you@company.com';

// On the dev server, the signup is simulated, so testing doesn't create HubSpot
// contacts: it succeeds after a second, or fails when the email address starts
// with "fail"
const simulate = process.env.NODE_ENV === 'development';

const icon = (path: ReturnType<typeof svg>) => html`
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    ${path}
  </svg>
`;
const shieldIcon = icon(
  svg`<path d="M12 3l8 3v5c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" />`
);
const checkIcon = icon(svg`<path d="M5 13l4 4L19 7" />`);
const spinnerIcon = icon(svg`<path d="M12 3a9 9 0 1 0 9 9" />`);

class SecurityAlerts extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state()
  private status: 'idle' | 'sending' | 'done' | 'error' = 'idle';

  @state()
  private emailError = '';

  // Only set when validation runs, not on every keystroke, so the check mark in
  // the field doesn't flicker while typing
  @state()
  private emailValid = false;

  private validationTimeout?: number;

  private get input() {
    return this.querySelector<HTMLInputElement>('#security-alerts-email')!;
  }

  // Shows the error for an invalid address, and the check mark for a valid
  // one. An empty field is only an error when submitting.
  private validate(requireValue: boolean) {
    const { value } = this.input;
    const valid = value ? this.input.checkValidity() : !requireValue;
    this.emailError = valid ? '' : EMAIL_ERROR;
    this.emailValid = valid && !!value;
    return valid;
  }

  // While typing, an address is often invalid only because it's unfinished, so
  // a pause in typing can show the check mark or clear an error, but never adds
  // one. Errors appear when leaving the field or submitting.
  private onInput() {
    // Editing the address after signing up, for example to fix a typo, makes the
    // form ready to submit again
    if (this.status === 'done') {
      this.status = 'idle';
    }
    this.emailValid = false;
    clearTimeout(this.validationTimeout);
    this.validationTimeout = window.setTimeout(() => {
      if (this.input.value && this.input.checkValidity()) {
        this.validate(false);
      }
    }, 600);
  }

  // Leaving an empty field neither adds an error nor clears one from submitting
  private onBlur() {
    clearTimeout(this.validationTimeout);
    if (this.input.value) {
      this.validate(false);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this.validationTimeout);
  }

  private async submit(e: SubmitEvent) {
    e.preventDefault();
    if (this.status === 'sending' || this.status === 'done') {
      return;
    }
    clearTimeout(this.validationTimeout);
    if (!this.validate(true)) {
      this.input.focus();
      return;
    }
    const email = this.input.value;
    this.status = 'sending';
    try {
      const response = simulate ? await simulateSignup(email) : await sendSignup(email);
      if (!response.ok) {
        if (await isInvalidEmailResponse(response)) {
          this.status = 'idle';
          this.emailError = EMAIL_ERROR;
          this.emailValid = false;
          this.input.focus();
          return;
        }
        throw new Error(`Signup failed with status ${response.status}`);
      }
      this.status = 'done';
    } catch (error) {
      console.error(error);
      this.status = 'error';
    }
  }

  // All three labels are rendered in the same grid cell, and only the current
  // one is visible, so the button keeps the width of the widest one
  private renderButton() {
    const done = this.status === 'done';
    const sending = this.status === 'sending';
    const state = (name: string, current: boolean, content: unknown) =>
      html`<span class="state state-${name} ${current ? 'current' : ''}">${content}</span>`;
    return html`
      <button
        class="button primary water ${done ? 'done' : ''}"
        aria-disabled=${done || sending ? 'true' : 'false'}
      >
        <span class="states">
          ${state('idle', !done && !sending, 'Get Alerts')}
          ${state('sending', sending, html`${spinnerIcon} Subscribing…`)}
          ${state('done', done, html`${checkIcon} Subscribed`)}
        </span>
      </button>
    `;
  }

  render() {
    return html`
      <section class="security-alerts" aria-labelledby="security-alerts-title">
        <span class="shield">${shieldIcon}</span>
        <div>
          <h3 id="security-alerts-title">Vaadin Security Alerts</h3>
          <p class="lead">
            Get an email for every Vaadin security advisory, including those that only affect older
            versions, with the fixed releases and how to upgrade. Security emails only.
          </p>
          <!-- Validated by the component, so its error message is shown instead of the browser's -->
          <form novalidate @submit=${this.submit}>
            <label for="security-alerts-email">Email Address</label>
            <div class="fields">
              <!-- The error is in the field's column, so it stays right under the
                   field when the button wraps to the next line -->
              <div class="email-column">
                <span class="email-field">
                  <input
                    id="security-alerts-email"
                    type="email"
                    name="email"
                    required
                    pattern=${EMAIL_PATTERN}
                    autocomplete="email"
                    placeholder="you@company.com"
                    aria-invalid=${this.emailError ? 'true' : 'false'}
                    aria-describedby="security-alerts-email-error"
                    ?readonly=${this.status === 'sending'}
                    @input=${this.onInput}
                    @blur=${this.onBlur}
                  />
                  ${this.emailValid ? html`<span class="valid">${checkIcon}</span>` : nothing}
                </span>
                <p id="security-alerts-email-error" class="error" role="alert">
                  ${this.emailError}
                </p>
              </div>
              ${this.renderButton()}
            </div>
            <!-- The button says "Subscribed"; this announces it to screen readers -->
            <span class="visually-hidden" role="status">
              ${this.status === 'done' ? 'You are now subscribed to Vaadin security alerts.' : ''}
            </span>
          </form>
          ${
            this.status === 'error'
              ? html`<p class="error" role="alert">
                  We couldn't sign you up. Try again in a moment.
                </p>`
              : nothing
          }
          <p class="privacy">
            ${CONSENT_TEXT}
            <a href=${PRIVACY_POLICY_URL} target="_blank" rel="noopener">Privacy policy</a>
          </p>
        </div>
      </section>
    `;
  }
}

function sendSignup(email: string) {
  return fetch(SIGNUP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: [
        { objectTypeId: '0-1', name: 'email', value: email },
        { objectTypeId: '0-1', name: 'first_offer_source', value: OFFER_SOURCE },
      ],
      context: {
        pageUri: location.href,
        pageName: document.title,
      },
      legalConsentOptions: {
        legitimateInterest: {
          value: true,
          subscriptionTypeId: SUBSCRIPTION_TYPE_ID,
          legalBasis: 'LEAD',
          text: `${CONSENT_TEXT} <a href="${PRIVACY_POLICY_URL}" target="_blank">Privacy policy</a>`,
        },
      },
    }),
  });
}

// HubSpot rejects addresses it considers invalid with a 400 and an
// INVALID_EMAIL error
async function isInvalidEmailResponse(response: Response) {
  if (response.status !== 400) {
    return false;
  }
  try {
    const body: { errors?: { errorType?: string }[] } = await response.json();
    return !!body.errors?.some((error) => error.errorType === 'INVALID_EMAIL');
  } catch {
    return false;
  }
}

async function simulateSignup(email: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return new Response(null, { status: email.startsWith('fail') ? 500 : 200 });
}

customElements.define('docs-security-alerts', SecurityAlerts);
