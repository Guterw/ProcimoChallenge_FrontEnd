import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

jest.mock('../../components/Map/Map', () => () => 
<div data-testid="map-component"></div>);

describe('Home Component', () => {
  it('renders without crashing', () => {
    render(<Home />);
  });

  it('renders the Map component', () => {
    const { getByTestId } = render(<Home />);
    const mapComponent = getByTestId('map-component');
    expect(mapComponent).toBeInTheDocument();
  });
});