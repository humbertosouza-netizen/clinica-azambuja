"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaArrowLeft, FaQuoteLeft, FaQuoteRight, FaMedal, FaHandHoldingHeart, FaUserMd } from 'react-icons/fa';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Placeholder fallback (temporário)
const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzMwMmMzNiIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMzIiIGZpbGw9IiNkZTI3NTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5JbWFnZW0gUGxhY2Vob2xkZXI8L3RleHQ+PC9zdmc+";

// Caminho das imagens para adicionar depois:
// 1. /public/images/historia/banner-historia.jpg - Imagem principal da página (banner horizontal, 1600x800px)

// Valores da clínica
const valores = [
  {
    icon: <FaUserMd className="text-primary" size={36} />,
    title: 'Profissionalismo',
    description: 'Nossa equipe altamente qualificada está em constante atualização, garantindo procedimentos seguros e eficazes.',
  },
  {
    icon: <FaHandHoldingHeart className="text-primary" size={36} />,
    title: 'Cuidado Humanizado',
    description: 'Tratamos cada paciente como único, compreendendo suas necessidades individuais para resultados personalizados.',
  },
  {
    icon: <FaMedal className="text-primary" size={36} />,
    title: 'Excelência',
    description: 'Buscamos a perfeição em cada detalhe, desde o ambiente da clínica até o resultado final de cada procedimento.',
  },
];

export default function NossaHistoriaPage() {
  // Hook para detectar elementos no viewport e animar
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [valoresRef, valoresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [citacaoRef, citacaoInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 bg-background">
        {/* Hero Section - Banner principal */}
        <div className="container">
          <Link href="/" className="inline-flex items-center text-primary mb-8 hover:underline">
            <FaArrowLeft className="mr-2" />
            Voltar para a página inicial
          </Link>
          
          <motion.div 
            ref={heroRef}
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[40vh] md:h-[60vh] rounded-2xl overflow-hidden mb-12"
          >
            <Image
              src="/images/historia/banner-historia.jpeg"
              alt="Equipe da Clínica Azambuja"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
              <h1 className="heading-lg md:heading-xl text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Nossa História
              </h1>
              <p className="text-white max-w-2xl text-lg md:text-xl font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Conheça a trajetória de evolução e compromisso com a beleza e autoestima que construiu a Clínica Azambuja.
              </p>
            </div>
          </motion.div>

          {/* Introdução */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="heading-md text-white mb-6">Uma Jornada de Transformações</h2>
              <p className="text-white/80 text-lg mb-6">
                A Clínica Azambuja nasceu do sonho de criar um espaço onde a estética e a saúde caminham juntas, 
                proporcionando tratamentos que vão além da beleza superficial e transformam vidas através da 
                recuperação da autoestima e do bem-estar.
              </p>
              <p className="text-white/80 text-lg">
                Desde nossa fundação, buscamos a excelência em cada detalhe, investindo constantemente em 
                tecnologias avançadas e formação contínua de nossa equipe para garantir os melhores resultados 
                para nossos pacientes.
              </p>
            </motion.div>
          </div>
          
          {/* Citação */}
          <motion.div
            ref={citacaoRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={citacaoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mb-20 p-10 rounded-2xl bg-primary/5 border border-primary/20 text-center"
          >
            <FaQuoteLeft className="text-primary/30 text-4xl mx-auto mb-6" />
            <blockquote>
              <p className="text-white text-xl md:text-2xl font-light italic mb-6">
                "Nossa maior realização é ver o sorriso e a confiança renovada em cada paciente após um tratamento. 
                Mais do que procedimentos estéticos, oferecemos uma nova perspectiva de autoestima e bem-estar."
              </p>
              <footer className="text-white/70">
                <cite>Dra. Azambuja, Fundadora e Diretora Clínica</cite>
              </footer>
            </blockquote>
            <FaQuoteRight className="text-primary/30 text-4xl mx-auto mt-6" />
          </motion.div>
          
          {/* Valores */}
          <div className="max-w-5xl mx-auto" ref={valoresRef}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={valoresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="heading-md text-white text-center mb-12"
            >
              Nossos Valores
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {valores.map((valor, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valoresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-background/30 border border-primary/10 rounded-xl p-8 text-center hover:border-primary/20 transition-all"
                >
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                    {valor.icon}
                  </div>
                  <h3 className="text-white text-xl font-bold mb-4">{valor.title}</h3>
                  <p className="text-white/70">{valor.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="max-w-4xl mx-auto mt-20">
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 md:p-12 text-center">
              <h2 className="heading-md text-white mb-4">Faça Parte da Nossa História</h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Venha conhecer nossa clínica e descubra como podemos transformar sua vida com 
                tratamentos personalizados que unem ciência, arte e cuidado.
              </p>
              <Link href="/#contato" className="inline-block px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                Agendar Avaliação
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 