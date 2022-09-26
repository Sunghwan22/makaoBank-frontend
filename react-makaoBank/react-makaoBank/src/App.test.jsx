import { MemoryRouter } from 'react-router-dom';
import App from './App';

const { render, screen } = require('@testing-library/react');

test('App', () => {
  render((
    <MemoryRouter>
      <App />
    </MemoryRouter>));

  screen.getByText('Hello, world');
});
