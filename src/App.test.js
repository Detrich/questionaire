import { render, screen } from '@testing-library/react';
import Questionnaire from "./Questionnaire"

test('renders learn react link', () => {
  render(<Questionnaire />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
