import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('Testing the SearchBar component', () => {
    const mockOnSearch = jest.fn();

    beforeEach(() => {
        render(<SearchBar onSearch={mockOnSearch} />);
    });

    it('should render the search input', () => {
        const inputElement = screen.getByPlaceholderText('Search...');
        expect(inputElement).toBeInTheDocument();
    });

    it('should call onSearch when input value changes', () => {
        const inputElement = screen.getByPlaceholderText('Search...');
        fireEvent.change(inputElement, { target: { value: 'test' } });
        expect(mockOnSearch).toHaveBeenCalledWith('test');
    });
});
