import './init-flow-namespace';
// @ts-expect-error See webpack.dspublisher.js
import('all-flow-imports-or-empty').catch(() => {});

// Verify if session is still active and reload the page otherwise
import './session-verification';
