import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope, FaHeart } from 'react-icons/fa';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Logo & Info */}
          <div>
            <h3 className="font-serif text-2xl text-primary font-bold mb-4">Clínica Azambuja</h3>
            <p className="text-white/80 mb-6">
              Transformando vidas através da beleza e autoestima, com tratamentos estéticos avançados e atendimento personalizado.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://instagram.com/azambuja.estetica"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
                aria-label="Instagram Dra. Eliziane"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://instagram.com/azambujaharmonizacao"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
                aria-label="Instagram Dra. Mayra"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://maps.google.com/?q=R. Irmã Bernada, 925 - Jardim Tropical, Rondonópolis - MT, 78715-194"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
              >
                <FaMapMarkerAlt size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-medium text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/80 hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-white/80 hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/facial" className="text-white/80 hover:text-primary transition-colors">
                  Harmonização Facial
                </Link>
              </li>
              <li>
                <Link href="/corporal" className="text-white/80 hover:text-primary transition-colors">
                  Estética Corporal
                </Link>
              </li>
              <li>
                <Link href="/intima" className="text-white/80 hover:text-primary transition-colors">
                  Estética Íntima
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-white/80 hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium text-lg mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-primary mr-2 mt-1" />
                <a
                  href="https://maps.google.com/?q=R. Irmã Bernada, 925 - Jardim Tropical, Rondonópolis - MT, 78715-194"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-primary transition-colors"
                >
                  R. Irmã Bernada, 925 - Jardim Tropical, Rondonópolis - MT, 78715-194
                </a>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-primary mr-2" />
                <a
                  href="tel:+5566996410251"
                  className="text-white/80 hover:text-primary transition-colors"
                >
                  (66) 99641-0251
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-primary mr-2" />
                <a
                  href="mailto:contato@clinicaazambuja.com.br"
                  className="text-white/80 hover:text-primary transition-colors"
                >
                  contato@clinicaazambuja.com.br
                </a>
              </li>
              <li className="flex items-center">
                <FaInstagram className="text-primary mr-2" />
                <a
                  href="https://instagram.com/azambuja.estetica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-primary transition-colors"
                >
                  @azambuja.estetica
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-center text-white/60 text-sm">
            © {currentYear} Clínica Azambuja. Todos os direitos reservados.
          </p>
          
          {/* Créditos do desenvolvedor com efeito pulsante */}
          <div className="mt-3 text-center">
            <a 
              href="https://www.instagram.com/humbertodev.js" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-white/60 hover:text-primary transition-colors group"
            >
              <span className="text-xs">Desenvolvido por Humberto Azambuja</span>
              <FaHeart 
                className="ml-2 text-primary animate-pulse group-hover:animate-none" 
                size={12}
                aria-label="Feito com amor"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}; 