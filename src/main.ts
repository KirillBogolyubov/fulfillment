import { ViteSSG } from 'vite-ssg';
import { createHead } from '@vueuse/head';

import App from './App.vue';
// import './registerServiceWorker';

import './styles/index.scss';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import routes from 'virtual:generated-pages';

const head = createHead();

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes },
  ({ app }) => {
    app.use(head);
  },
);
