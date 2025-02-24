import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('ToDo App', () => {

  beforeEach(() => {
    localStorage.clear(); 
  });

  it('Adds a New Item', () => {
    render(<App />);

    expect(screen.queryByText('NewItem')).not.toBeInTheDocument();

    const input = screen.getByPlaceholderText('Add To Do');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'NewItem' } });
    fireEvent.click(addButton);

    expect(screen.queryByText('NewItem')).toBeInTheDocument();
  });

  it('Deletes an Item', () => {
    render(<App />);

    expect(screen.queryByText('NewItem')).not.toBeInTheDocument();

    const input = screen.getByPlaceholderText('Add To Do');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'NewItem' } });
    fireEvent.click(addButton);

    expect(screen.queryByText('NewItem')).toBeInTheDocument();

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('NewItem')).not.toBeInTheDocument();

  });

});
