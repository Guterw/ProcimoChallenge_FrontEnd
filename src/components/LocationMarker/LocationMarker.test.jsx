import React from "react";
import { render } from '@testing-library/react';
import LocationMarker from './LocationMarker';
import { useMapEvents } from 'react-leaflet';

jest.mock('leaflet', () => ({
    icon: () => {}
}));

jest.mock('react-leaflet', () => ({
    useMapEvents: jest.fn()
}));

describe('LocationMarker Component', () => {
    test('renders location marker with correct data', () => {
        useMapEvents.mockImplementation(() => null);

        render(<LocationMarker />);
        
        expect(useMapEvents).toHaveBeenCalled();
    });
});
