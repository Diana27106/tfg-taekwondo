import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import { describe, it, expect } from 'vitest';

describe('Navbar Component', () => {
  it('renders all navigation links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getAllByText('Inicio')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Nuestra Escuela')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Clases y Sedes')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Patrocinadores')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Blog')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Contacto')[0]).toBeInTheDocument();
  });

  it('renders the logo', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const logo = screen.getByAltText('Taekwondo Sierra Nevada');
    expect(logo).toBeInTheDocument();
  });
});
