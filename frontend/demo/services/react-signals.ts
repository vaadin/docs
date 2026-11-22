// The docs site build replaces `@vaadin/hilla-react-signals` with this module.
// It provides the signals of `@preact/signals-react`, so that the live examples
// use a single copy of them (https://github.com/preactjs/signals/issues/414).
// The live examples have no server, so the full-stack signal classes that the
// generated services import are placeholders that can't be created.
export * from '@preact/signals-react';

function FullStackSignalPlaceholder(): never {
  throw new Error('Full-stack signals need a server, which the live examples do not have');
}

export {
  FullStackSignalPlaceholder as FullStackSignal,
  FullStackSignalPlaceholder as ListSignal,
  FullStackSignalPlaceholder as NumberSignal,
  FullStackSignalPlaceholder as ValueSignal,
};
