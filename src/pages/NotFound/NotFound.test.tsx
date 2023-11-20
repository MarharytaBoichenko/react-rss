import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from '../../App';
import { MemoryRouter } from 'react-router-dom';
test('landing on a bad page', () => {
  const badRoute = '/bad-route';

  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.queryByRole('heading')).toHaveTextContent('Not Found');
});
