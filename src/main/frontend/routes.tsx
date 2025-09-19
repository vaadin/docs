import { RouterConfigurationBuilder } from '@vaadin/hilla-file-router/runtime.js';
import Flow from 'Frontend/generated/flow/Flow';

export const { router, routes } = new RouterConfigurationBuilder().withFallback(Flow).build();
