"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaInstagram } from 'react-icons/fa';

// Caminho das imagens reais
// 1. /public/images/about/dra-eliziane-principal.png - Imagem principal da Dra. Eliziane (quadrada, alta resolução, 800x800px)
// 2. /public/images/about/dra-eliziane-avatar.jpg - Avatar da Dra. Eliziane (redondo, 128x128px)
// 3. /public/images/about/dra-mayra-avatar.png - Avatar da Dra. Mayra (redondo, 128x128px)

export const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-12 md:py-16 lg:py-20" ref={ref}>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image Column - Imagem principal da Dra. Eliziane */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-square w-full max-w-sm mx-auto">
              <Image
                src="/images/about/dra-eliziane-principal.png"
                alt="Dra. Eliziane Azambuja"
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute -right-4 -bottom-4 bg-primary text-white p-3 md:p-4 rounded-lg">
                <p className="font-serif font-bold text-base md:text-lg">+15</p>
                <p className="text-xs">Anos de Experiência</p>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-primary font-medium mb-2 text-center lg:text-left">Sobre Nós</h2>
            <h3 className="heading-lg text-white mb-4 md:mb-6 text-center lg:text-left">
              Expertise e Excelência em Estética Avançada
            </h3>
            <p className="text-white/80 mb-4 text-sm md:text-base">
              A Clínica Azambuja nasceu do sonho de transformar vidas através da beleza e autoestima. Sob a direção das Dras. Eliziane e Mayra Azambuja, nos tornamos referência em Rondonópolis e região.
            </p>
            <p className="text-white/80 mb-6 text-sm md:text-base">
              Combinamos tecnologia de ponta, conhecimento científico e um olhar humanizado para oferecer tratamentos personalizados que respeitam a individualidade de cada paciente.
            </p>

            {/* Doctors */}
            <div className="space-y-4 mb-8">
              {/* Avatar da Dra. Eliziane */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 relative mb-3 sm:mb-0">
                  <Image
                    src="/images/about/dra-eliziane-avatar.jpg"
                    alt="Dra. Eliziane Azambuja"
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start">
                    <h4 className="text-white font-medium text-lg">Dra. Eliziane Azambuja</h4>
                    <a 
                      href="https://instagram.com/azambuja.estetica" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="ml-2 text-primary hover:text-white transition-colors"
                      aria-label="Instagram de Dra. Eliziane Azambuja"
                    >
                      <FaInstagram size={18} />
                    </a>
                  </div>
                  <p className="text-primary text-sm mb-1">Biomédica Esteta | Especialista em Harmonização Facial</p>
                  <p className="text-white/70 text-xs md:text-sm">
                    +15 anos transformando vidas com expertise em Bioestimuladores de Colágeno e Fios de Sustentação.
                  </p>
                </div>
              </div>

              {/* Avatar da Dra. Mayra */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 mt-8">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 relative mb-3 sm:mb-0">
                  <Image
                    src="/images/about/dra-mayra-avatar.png"
                    alt="Dra. Mayra Azambuja"
                    fill
                    className="object-cover object-top"
                    sizes="64px"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start">
                    <h4 className="text-white font-medium text-lg">Dra. Mayra Azambuja</h4>
                    <a 
                      href="https://instagram.com/azambujaharmonizacao" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="ml-2 text-primary hover:text-white transition-colors"
                      aria-label="Instagram de Dra. Mayra Azambuja"
                    >
                      <FaInstagram size={18} />
                    </a>
                  </div>
                  <p className="text-primary text-sm mb-1">Farmacêutica Bioquímica | Expert em Harmonização Íntima</p>
                  <p className="text-white/70 text-xs md:text-sm">
                    Pioneira em Mato Grosso na técnica de Ninfoplastia sem cortes, com mais de 200 procedimentos íntimos realizados.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Link href="/nossa-historia">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Conheça Nossa História
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 