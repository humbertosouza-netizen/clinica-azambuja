"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaArrowRight } from 'react-icons/fa';

// Placeholder fallback (usado apenas se necessário)
const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzMwMmMzNiIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMzIiIGZpbGw9IiNkZTI3NTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5JbWFnZW0gUGxhY2Vob2xkZXI8L3RleHQ+PC9zdmc+";

const services = [
  {
    id: 'facial',
    title: 'Harmonização Facial',
    description: 'Tratamentos personalizados para rejuvenescimento e harmonização que valorizam sua beleza natural.',
    image: '/images/services/facial-harmonizacao.jpeg',
    procedures: ['Botox', 'Skinbooster', 'Bioestimuladores', 'Fios de Sustentação', 'Lipo de Papada'],
    link: '/facial',
  },
  {
    id: 'corporal',
    title: 'Estética Corporal',
    description: 'Procedimentos avançados para modelagem, definição e tratamento de gordura localizada.',
    image: '/images/services/corpo-tratamentos.jpeg',
    procedures: ['Emagrecimento Rápido', 'Intradermoterapia', 'Gordura Localizada', 'Microvasinhos'],
    link: '/corporal',
  },
  {
    id: 'intima',
    title: 'Harmonização Íntima',
    description: 'Técnicas exclusivas e minimamente invasivas para rejuvenescimento e harmonização da região íntima.',
    image: '/images/services/intimo-tratamentos.jpeg',
    procedures: ['Ninfoplastia sem cortes', 'Clareamento Íntimo', 'Preenchimento', 'Bioestimuladores Íntimos'],
    link: '/intima',
  },
];

export const ServicesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="servicos" className="py-20 bg-background/50" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-primary font-medium mb-2">Nossos Serviços</h2>
          <h3 className="heading-lg text-white mb-4 max-w-2xl mx-auto">
            Tratamentos Estéticos Exclusivos para Todas as Necessidades
          </h3>
          <p className="text-white/80 max-w-2xl mx-auto">
            Combinamos tecnologia de ponta, conhecimento científico e um olhar humanizado em cada procedimento.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="bg-background border border-white/10 rounded-xl overflow-hidden group"
            >
              {/* Service Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                <h4 className="absolute bottom-4 left-4 text-white font-serif text-xl font-bold">
                  {service.title}
                </h4>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <p className="text-white/80 mb-4">{service.description}</p>
                
                {/* Procedures List */}
                <ul className="space-y-2 mb-6">
                  {service.procedures.map((procedure, index) => (
                    <li key={index} className="flex items-center text-white/70 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {procedure}
                    </li>
                  ))}
                </ul>
                
                {/* Link to Service Page */}
                <Link
                  href={service.link}
                  className="inline-flex items-center text-primary font-medium hover:underline group"
                >
                  Saiba Mais
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}; 