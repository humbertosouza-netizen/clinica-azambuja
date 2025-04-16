"use client"

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/Button';

// Placeholder fallback
const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzMwMmMzNiIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMzIiIGZpbGw9IiNkZTI3NTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5JbWFnZW0gUGxhY2Vob2xkZXI8L3RleHQ+PC9zdmc+";

const beforeAfterItems = [
  {
    id: 1,
    title: 'Harmonização Facial',
    description: 'Bioestimuladores + Fios de Sustentação + Botox',
    before: '/images/before-after/harmonizacao-antes.jpg',
    after: '/images/before-after/harmonizacao-depois.jpg',
    category: 'facial',
  },
  {
    id: 4,
    title: 'Clareamento Facial',
    description: 'Tratamento de manchas e hipercromia facial',
    before: '/images/before-after/clareamento-antes.jpg',
    after: '/images/before-after/clareamento-depois.jpg',
    category: 'facial',
  },
  {
    id: 5,
    title: 'Rejuvenescimento Facial',
    description: 'Protocolo personalizado com tecnologia avançada',
    before: '/images/before-after/celulite-antes.jpg',
    after: '/images/before-after/celulite-depois.jpg',
    category: 'facial',
  },
];

export const BeforeAfterSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeItem, setActiveItem] = useState(beforeAfterItems[0]);
  const [showAfter, setShowAfter] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredItems = activeCategory === 'all'
    ? beforeAfterItems
    : beforeAfterItems.filter(item => item.category === activeCategory);

  const toggleBeforeAfter = () => {
    setShowAfter(!showAfter);
  };

  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-primary font-medium mb-2">Resultados Reais</h2>
          <h3 className="heading-lg text-white mb-4 max-w-2xl mx-auto">
            Antes &amp; Depois
          </h3>
          <p className="text-white/80 max-w-2xl mx-auto">
            Conheça os resultados transformadores obtidos por nossas pacientes com nossos tratamentos exclusivos.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={activeCategory === 'all' ? 'primary' : 'outline'}
            onClick={() => setActiveCategory('all')}
          >
            Todos
          </Button>
          <Button
            variant={activeCategory === 'facial' ? 'primary' : 'outline'}
            onClick={() => setActiveCategory('facial')}
          >
            Facial
          </Button>
          <Button
            variant={activeCategory === 'corporal' ? 'primary' : 'outline'}
            onClick={() => setActiveCategory('corporal')}
          >
            Corporal
          </Button>
          <Button
            variant={activeCategory === 'intima' ? 'primary' : 'outline'}
            onClick={() => setActiveCategory('intima')}
          >
            Íntima
          </Button>
        </div>

        {/* Main Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Image with Toggle Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 relative aspect-[4/3] rounded-xl overflow-hidden group"
            ref={containerRef}
          >
            {/* Imagem que aparece primeiro (Antes do tratamento) */}
            <div 
              className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out"
              style={{ opacity: showAfter ? 0 : 1 }}
            >
              <Image
                src={activeItem.before}
                alt={`${activeItem.title} - Antes`}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            
            {/* Imagem que aparece ao clicar (Depois do tratamento) */}
            <div 
              className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out"
              style={{ opacity: showAfter ? 1 : 0 }}
            >
              <Image
                src={activeItem.after}
                alt={`${activeItem.title} - Depois`}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            
            {/* Status Badge */}
            <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-white text-sm font-medium z-10 shadow-lg">
              {showAfter ? 'DEPOIS' : 'ANTES'}
            </div>
            
            {/* Toggle Button */}
            <button
              onClick={toggleBeforeAfter}
              className="absolute bottom-4 right-4 bg-white text-primary px-3 py-1 rounded-full text-sm font-medium shadow-lg transition-transform hover:scale-105 z-10"
            >
              Ver {showAfter ? 'ANTES' : 'DEPOIS'}
            </button>
          </motion.div>

          {/* Thumbnails */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-white font-medium text-lg mb-4">Outros Resultados</h4>
            
            <div className="grid grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item);
                    setShowAfter(false); // Reset para mostrar o "antes" primeiro
                  }}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    activeItem.id === item.id ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  {/* Split thumbnail view for before/after */}
                  <div className="absolute inset-0 flex h-full w-full">
                    {/* Depois (left half) */}
                    <div className="relative w-1/2 h-full overflow-hidden">
                      <Image
                        src={item.after}
                        alt={`${item.title} - Depois`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    
                    {/* Antes (right half) */}
                    <div className="relative w-1/2 h-full overflow-hidden">
                      <Image
                        src={item.before}
                        alt={`${item.title} - Antes`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                  
                  {/* Divider line */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white bg-opacity-80 z-10"></div>
                  
                  <div className="absolute inset-0 bg-background/30 hover:bg-background/10 transition-colors">
                    {activeItem.id === item.id && (
                      <div className="absolute bottom-2 right-2 w-3 h-3 bg-primary rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-6">
              <p className="text-white/70 text-center mb-3 text-sm">
                <span className="inline-block bg-primary/20 px-2 py-1 rounded-md">
                  💡 Clique no botão para comparar antes e depois
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 