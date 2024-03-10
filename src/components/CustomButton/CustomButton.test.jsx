import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomButton from './CustomButton';

test('renders button text', () => {
  const buttonText = 'Click me';
  const { getByText } = render(<CustomButton>{buttonText}</CustomButton>);
  const buttonElement = getByText(buttonText);
  expect(buttonElement).toBeInTheDocument();
});

test('click event is triggered', () => {
  const onClickMock = jest.fn();
  const { getByText } = render(<CustomButton onClick={onClickMock}>Click me</CustomButton>);
  const buttonElement = getByText('Click me');
  fireEvent.click(buttonElement);
  expect(onClickMock).toHaveBeenCalled();
});

test('tooltip is shown on mouse over and hidden on mouse out', () => {
  const { getByText, getByTestId } = render(
    <CustomButton tooltip="Tooltip text">Hover me</CustomButton>
  );
  const buttonElement = getByText('Hover me');

  fireEvent.mouseOver(buttonElement);
  const tooltipElement = getByTestId('tooltip');
  expect(tooltipElement).toBeInTheDocument();

  fireEvent.mouseOut(buttonElement);
  expect(tooltipElement).not.toBeInTheDocument();
});
