"use client"

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/nossa-historia', label: 'Nossa História' },
  { href: '/facial', label: 'Harmonização Facial' },
  { href: '/corporal', label: 'Estética Corporal' },
  { href: '/intima', label: 'Estética Íntima' },
  { href: '/#contato', label: 'Contato' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Detectar scroll para mudar o estilo do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar estado inicial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Controlador de menu mobile com preservação de posição
  const openMobileMenu = useCallback(() => {
    const currentScrollPosition = window.pageYOffset;
    setScrollPosition(currentScrollPosition);
    
    // Aplicar estilo diretamente ao elemento raiz
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.position = 'fixed';
    document.documentElement.style.top = `-${currentScrollPosition}px`;
    document.documentElement.style.width = '100%';
    
    setIsMobileMenuOpen(true);
  }, []);
  
  const closeMobileMenu = useCallback(() => {
    // Restaurar o scroll
    document.documentElement.style.overflow = '';
    document.documentElement.style.position = '';
    document.documentElement.style.top = '';
    document.documentElement.style.width = '';
    window.scrollTo(0, scrollPosition);
    
    setIsMobileMenuOpen(false);
  }, [scrollPosition]);
  
  const toggleMobileMenu = useCallback(() => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }, [isMobileMenuOpen, closeMobileMenu, openMobileMenu]);

  // Fechar menu ao mudar de rota
  useEffect(() => {
    const handleRouteChange = () => {
      if (isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Fechar menu ao redimensionar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Limpar estilos caso o componente seja desmontado com o menu aberto
  useEffect(() => {
    return () => {
      if (isMobileMenuOpen) {
        document.documentElement.style.overflow = '';
        document.documentElement.style.position = '';
        document.documentElement.style.top = '';
        document.documentElement.style.width = '';
      }
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm py-2 shadow-md' : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-20">
          <span className="font-serif text-2xl text-primary font-bold">Azambuja</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Button 
          variant="primary" 
          className="hidden md:flex"
          whatsapp={true}
          whatsappMessage="Olá, gostaria de agendar uma avaliação. Vi o site de vocês e tenho interesse nos serviços."
        >
          Agendar Avaliação
        </Button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-40 relative text-white focus:outline-none p-2 -m-2"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`block w-6 h-0.5 bg-white mb-1.5 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} 
                style={{transition: 'transform 0.2s ease-out'}}></span>
          <span className={`block w-6 h-0.5 bg-white mb-1.5 ${isMobileMenuOpen ? 'opacity-0' : ''}`}
                style={{transition: 'opacity 0.2s ease-out'}}></span>
          <span className={`block w-6 h-0.5 bg-white ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                style={{transition: 'transform 0.2s ease-out'}}></span>
        </button>

        {/* Mobile Menu - Abordagem sem animações que interferem no scroll */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-background z-30"
          >
            <div className="flex h-full flex-col justify-center items-center">
              <nav className="flex flex-col space-y-6 items-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white text-xl font-medium hover:text-primary py-2"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="mt-8 w-64 max-w-full" 
                  onClick={closeMobileMenu}
                  whatsapp={true}
                  whatsappMessage="Olá, gostaria de agendar uma avaliação. Vi o site de vocês e tenho interesse nos serviços."
                >
                  Agendar Avaliação
                </Button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}; 