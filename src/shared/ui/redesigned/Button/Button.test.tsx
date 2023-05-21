import { render, screen } from '@testing-library/react';
import { Button } from '../Button/Button';

describe('Button', () => {
  test('Test render', () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });
  test('Test to have clear theme', () => {
    render(<Button variant='clear'>TEST</Button>);
    expect(screen.getByText('TEST')).toHaveClass('clear');
  });
});
