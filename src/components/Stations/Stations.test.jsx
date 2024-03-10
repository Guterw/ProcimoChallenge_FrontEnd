import React from "react";
import { render } from '@testing-library/react';
import Stations from './Stations';

jest.mock('react-leaflet', () => ({
    Marker: ({ children }) => <div>{children}</div>,
    Tooltip: ({ children }) => <div>{children}</div>
}));

jest.mock('leaflet', () => ({
    icon: () => {}
}));

const mockData = {
    latitude: 40.7128,
    longitude: -74.0060,
    name: 'Sample Station',
    free_bikes: 10,
    empty_slots: 5
};

describe('Stations Component', () => {
    test('renders station with correct data', () => {
        const { getByText } = render(
            <Stations data={mockData} index={1} />
        );
        expect(getByText('Sample Station')).toBeInTheDocument();
        expect(getByText('10 Available bikes')).toBeInTheDocument();
        expect(getByText('5 Empty spaces')).toBeInTheDocument();
    });
});
