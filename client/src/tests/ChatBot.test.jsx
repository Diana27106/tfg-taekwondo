import { render, screen, fireEvent } from '@testing-library/react';
import ChatBot from '../components/public/ChatBot';
import { describe, it, expect, vi } from 'vitest';

describe('ChatBot Component', () => {
  const mockOnClose = vi.fn();
  const mockOnSend = vi.fn();
  const messages = [
    { role: 'bot', content: 'Hola' },
    { role: 'user', content: '¿Cómo estás?' }
  ];

  it('renders messages correctly', () => {
    render(
      <ChatBot 
        onClose={mockOnClose} 
        onSend={mockOnSend} 
        messages={messages} 
        isLoading={false} 
      />
    );

    expect(screen.getByText('Hola')).toBeInTheDocument();
    expect(screen.getByText('¿Cómo estás?')).toBeInTheDocument();
  });

  it('calls onSend when send button is clicked', () => {
    render(
      <ChatBot 
        onClose={mockOnClose} 
        onSend={mockOnSend} 
        messages={[]} 
        isLoading={false} 
      />
    );

    const input = screen.getByPlaceholderText('Escribe tu pregunta...');
    fireEvent.change(input, { target: { value: 'Nueva pregunta' } });
    
    // Find the send button - it's the one with the Send icon inside the textarea container
    // Or just use the last button in the component
    const buttons = screen.getAllByRole('button');
    const sendBtn = buttons[buttons.length - 1]; 
    
    fireEvent.click(sendBtn);

    expect(mockOnSend).toHaveBeenCalledWith('Nueva pregunta');
  });

  it('shows loading state', () => {
    render(
      <ChatBot 
        onClose={mockOnClose} 
        onSend={mockOnSend} 
        messages={[]} 
        isLoading={true} 
      />
    );

    expect(screen.getByText('Pensando...')).toBeInTheDocument();
  });
});
