import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const RouterDecorator = (Story: React.ComponentType) => (
  <Router>
    <Story />
  </Router>
);

export default RouterDecorator;
