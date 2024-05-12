import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

export const Wrapper = (children: ReactNode) => (
  <Router>
    <Provider store={store}>{children}</Provider>
  </Router>
);

test('show current location button', () => {
  render(Wrapper(<App />));
  const buttonText = screen.getByText('Show weather for current location');
  expect(buttonText).toBeInTheDocument();
});
