import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from './App';

describe('ToDo App', () => {



  it('Adds a New Item', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Add To Do');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'NewItem' } });
    fireEvent.click(addButton);

    expect(screen.getByText('NewItem')).toBeInTheDocument();
  });

  it('Deletes an Item', () => {
    render(<App />);


    expect(screen.getByText('NewItem')).toBeInTheDocument();

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('NewItem')).not.toBeInTheDocument();

  });

});
