// This file needs to be impored to any embedded example that needs to access a connect endpoint
import client from './generated/connect-client.default';
// @ts-ignore
client.prefix = __VAADIN_CONNECT_PREFIX__;
