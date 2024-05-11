import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const RouterDecorator = (Story: any) => (
  <Router>
    <Story />
  </Router>
);

export default RouterDecorator;
