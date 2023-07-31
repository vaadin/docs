import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { css } from '@emotion/css';
import { LoginForm } from '@vaadin/react-components/LoginForm.js';

const backdrop = css`
  background: var(--lumo-base-color) linear-gradient(var(--lumo-shade-5pct), var(--lumo-shade-5pct));
  display: flex;
  justify-content: center;
  padding: var(--lumo-space-m);
`;

const card = css`
  background: var(--lumo-base-color) linear-gradient(var(--lumo-tint-5pct), var(--lumo-tint-5pct));
  border-radius: var(--lumo-border-radius);
  box-shadow: var(--lumo-box-shadow-s);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: var(--lumo-space-s);
  max-width: 100%;
  overflow: hidden;
  height: max-content;
  width: calc(var(--lumo-size-m) * 10);
`;

const brand = css`
  background-color: var(--lumo-primary-color);
  box-sizing: border-box;
  color: var(--lumo-primary-contrast-color);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: flex-end;
  min-height: calc(var(--lumo-size-m) * 5);
  overflow: hidden;
  padding: var(--lumo-space-l) var(--lumo-space-xl) var(--lumo-space-l) var(--lumo-space-l);
`;

const description = css`
  color: var(--lumo-tint-70pct);
  line-height: var(--lumo-line-height-s);
  margin-bottom: 0;
  margin-top: 0.5em;
`;

function LoginOverlayMockupElement({
  headerTitle = 'App name',
  description = 'Application description',
  error = false,
  i18n,
}) {
  return (
    <>
      {/* tag::snippet[] */}
      <div className={backdrop}>
        <section className={card}>
          <div className={brand}>
            <h1 className="title">{headerTitle}</h1>
            <p className={description}>{description}</p>
          </div>
          <div className="form">
            <LoginForm error={error} i18n={i18n} noAutofocus />
          </div>
        </section>
      </div>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(LoginOverlayMockupElement);
