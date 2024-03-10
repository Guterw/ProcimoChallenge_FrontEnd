import React from "react";
import { render, fireEvent } from '@testing-library/react';
import Networks from './Networks';

jest.mock('react-leaflet', () => ({
    Marker: ({ children, eventHandlers }) => <div data-testid="marker" onClick={eventHandlers.click}>{children}</div>,
    Tooltip: ({ children }) => <div>{children}</div>
}));

jest.mock('leaflet', () => ({
    icon: () => {}
}));

const mockData = {
    id: 1,
    name: 'Sample Network',
    location: {
        latitude: 40.7128,
        longitude: -74.0060,
        city: 'Sample City'
    }
};

describe('Networks Component', () => {
    test('renders network marker with correct data', () => {
        const onClick = jest.fn(); // Função de clique simulada

        const { getByText, getByTestId } = render(
            <Networks data={mockData} index={1} onClick={onClick} />
        );

        expect(getByText('Sample Network')).toBeInTheDocument();
        expect(getByText('Sample City')).toBeInTheDocument();

        fireEvent.click(getByTestId('marker'));

        expect(onClick).toHaveBeenCalledWith(1);
    });
});
