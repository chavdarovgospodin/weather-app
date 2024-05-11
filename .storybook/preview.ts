import type { Preview } from '@storybook/react';
import RouterDecorator from './routerDecorator';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [(Story) => RouterDecorator(Story)],
};

export default preview;
