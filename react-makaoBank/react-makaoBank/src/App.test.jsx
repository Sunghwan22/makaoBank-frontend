import App from './App';

const { render, screen } = require('@testing-library/react');

test('App', () => {
  render(<App />);

  screen.getByText('Hello, world');
});
