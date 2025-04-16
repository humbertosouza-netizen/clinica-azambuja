"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';

// Placeholder fallback
const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzMwMmMzNiIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMzIiIGZpbGw9IiNkZTI3NTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5JbWFnZW0gUGxhY2Vob2xkZXI8L3RleHQ+PC9zdmc+";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Aqui você implementaria a lógica de envio de formulário 
      // Para um serviço como EmailJS, Formspree, ou seu próprio backend
      
      // Simulação de envio
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Se bem-sucedido
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <main className="pt-24 pb-16 bg-background">
      <div className="container">
        <Link href="/" className="inline-flex items-center text-primary mb-8 hover:underline">
          <FaArrowLeft className="mr-2" />
          Voltar para a página inicial
        </Link>
        
        {/* Hero Section */}
        <div className="relative w-full h-[30vh] md:h-[40vh] rounded-2xl overflow-hidden mb-12">
          <Image
            src={placeholderImage}
            alt="Entre em Contato"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <h1 className="heading-lg md:heading-xl text-white mb-4">
              Entre em Contato
            </h1>
            <p className="text-white/80 max-w-2xl text-lg">
              Estamos à disposição para esclarecer suas dúvidas e agendar sua avaliação.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Informações de Contato */}
          <div>
            <h2 className="heading-md text-white mb-6">Fale Conosco</h2>
            
            <div className="space-y-8 mb-10">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <FaWhatsapp className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">WhatsApp</h3>
                  <p className="text-white/70">(66) 99641-0251</p>
                  <a href="https://wa.me/5566996410251" target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">
                    Enviar mensagem
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <FaEnvelope className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">E-mail</h3>
                  <p className="text-white/70">contato@clinicaazambuja.com.br</p>
                  <a href="mailto:contato@clinicaazambuja.com.br" className="text-primary text-sm hover:underline">
                    Enviar e-mail
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <FaMapMarkerAlt className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Endereço</h3>
                  <p className="text-white/70">
                    R. Irmã Bernada, 925 - Jardim Tropical<br />
                    Rondonópolis - MT, 78715-194
                  </p>
                  <a 
                    href="https://maps.google.com/?q=R. Irmã Bernada, 925 - Jardim Tropical, Rondonópolis - MT, 78715-194" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary text-sm hover:underline"
                  >
                    Ver no mapa
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <FaClock className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Horário de Atendimento</h3>
                  <p className="text-white/70">Segunda a Sexta: 8h às 18h</p>
                  <p className="text-white/70">Sábado: 8h às 12h</p>
                </div>
              </div>
            </div>
            
            <div className="relative w-full h-72 rounded-xl overflow-hidden">
              <Image
                src={placeholderImage}
                alt="Mapa da localização"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Formulário de Contato */}
          <div>
            <h2 className="heading-md text-white mb-6">Envie uma Mensagem</h2>
            
            {submitStatus === 'success' ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6 text-center">
                <h3 className="text-white text-xl font-medium mb-2">Mensagem Enviada!</h3>
                <p className="text-white/80 mb-4">
                  Agradecemos seu contato. Nossa equipe responderá o mais breve possível.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setSubmitStatus(null)}
                  className="mt-2"
                >
                  Enviar nova mensagem
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus === 'error' && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-4">
                    <p className="text-white/90">
                      Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato pelo WhatsApp.
                    </p>
                  </div>
                )}
                
                <div>
                  <label htmlFor="name" className="block text-white mb-2">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-white/20 rounded-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-white"
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-white/20 rounded-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-white"
                      placeholder="seu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-white mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-white/20 rounded-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-white"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-white mb-2">
                    Serviço de interesse
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-white/20 rounded-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-white"
                  >
                    <option value="">Selecione um serviço</option>
                    <option value="harmonizacao-facial">Harmonização Facial</option>
                    <option value="estetica-corporal">Estética Corporal</option>
                    <option value="estetica-intima">Estética Íntima</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-background border border-white/20 rounded-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-white"
                    placeholder="Descreva o que você procura..."
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 