"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaQuoteLeft, FaPlay } from 'react-icons/fa';

// Placeholder fallback
const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzMwMmMzNiIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMzIiIGZpbGw9IiNkZTI3NTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5JbWFnZW0gUGxhY2Vob2xkZXI8L3RleHQ+PC9zdmc+";

const testimonials = [
  {
    id: 1,
    name: 'Amanda S.',
    procedure: 'Harmonização Facial',
    image: placeholderImage,
    quote: 'Minha autoestima mudou completamente após os procedimentos. A equipe é incrível e os resultados superaram minhas expectativas.',
    video: '#',
  },
  {
    id: 2,
    name: 'Fernanda M.',
    procedure: 'Ninfoplastia sem cortes',
    image: placeholderImage,
    quote: 'A Dra. Mayra mudou minha vida! Procedimento rápido, indolor e com resultado que superou minhas expectativas.',
    video: '#',
  },
  {
    id: 3,
    name: 'Patrícia L.',
    procedure: 'Lipo de Papada',
    image: placeholderImage,
    quote: 'Recuperei a confiança para tirar fotos depois do tratamento. As Dras. da Clínica Azambuja são realmente as melhores!',
    video: '#',
  },
  {
    id: 4,
    name: 'Carla B.',
    procedure: 'Intradermoterapia',
    image: placeholderImage,
    quote: 'Resultado fantástico em apenas algumas sessões. Atendimento personalizado e cuidadoso em cada detalhe.',
    video: '#',
  },
];

export const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(testimonials[0]);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-background/50" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-primary font-medium mb-2">Depoimentos</h2>
          <h3 className="heading-lg text-white mb-4 max-w-2xl mx-auto">
            O Que Nossas Clientes Dizem
          </h3>
          <p className="text-white/80 max-w-2xl mx-auto">
            Histórias reais de transformação e satisfação das nossas pacientes.
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center mb-12">
          {/* Large Testimonial */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 bg-background border border-white/10 rounded-xl p-8 relative"
          >
            <FaQuoteLeft className="text-primary/20 text-6xl absolute top-6 left-6" />
            <div className="relative z-10">
              <p className="text-white text-xl mb-6 italic">
                &quot;{activeTestimonial.quote}&quot;
              </p>
              <div className="flex items-center">
                <div className="w-16 h-16 relative rounded-full overflow-hidden mr-4">
                  <Image
                    src={activeTestimonial.image}
                    alt={activeTestimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-medium">{activeTestimonial.name}</h4>
                  <p className="text-primary text-sm">{activeTestimonial.procedure}</p>
                </div>
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="ml-auto bg-primary/10 hover:bg-primary/20 transition-colors text-primary w-12 h-12 rounded-full flex items-center justify-center"
                >
                  <FaPlay />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Thumbnails */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-2 gap-4">
              {testimonials.map((testimonial) => (
                <button
                  key={testimonial.id}
                  onClick={() => setActiveTestimonial(testimonial)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    activeTestimonial.id === testimonial.id ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-sm font-medium">{testimonial.name}</p>
                    <p className="text-primary text-xs">{testimonial.procedure}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-primary rounded-xl p-8 text-center"
        >
          <h3 className="text-white text-2xl font-serif font-bold mb-2">
            +1000 Clientes Satisfeitas
          </h3>
          <p className="text-white/80">
            Junte-se às milhares de mulheres que transformaram suas vidas com nossos tratamentos
          </p>
        </motion.div>
      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-xl overflow-hidden max-w-4xl w-full">
            <div className="p-4 flex justify-between items-center border-b border-white/10">
              <h3 className="text-white font-medium">
                Depoimento: {activeTestimonial.name}
              </h3>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="text-white/70 hover:text-white"
              >
                Fechar
              </button>
            </div>
            <div className="aspect-video w-full relative flex items-center justify-center bg-background p-8">
              <p className="text-white/80 text-center">
                Vídeo de depoimento estará disponível em breve.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}; 