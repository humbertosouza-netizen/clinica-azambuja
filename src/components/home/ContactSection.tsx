"use client"

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import QuizComponent from '@/components/QuizComponent';

type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export const ContactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contato" className="py-20 bg-background" ref={ref}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-primary font-medium mb-2">Contato</h2>
            <h3 className="heading-lg text-white mb-6">
              Agende Sua Avaliação
            </h3>
            <p className="text-white/80 mb-8 max-w-md">
              Estamos prontas para transformar sua autoestima e qualidade de vida. Entre em contato e agende uma avaliação personalizada.
            </p>

            {/* Contact Information */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 flex-shrink-0">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Endereço</h4>
                  <p className="text-white/70">
                    R. Irmã Bernada, 925 - Jardim Tropical, Rondonópolis - MT, 78715-194
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 flex-shrink-0">
                  <FaPhone size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Telefone</h4>
                  <p className="text-white/70">(66) 99641-0251</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 flex-shrink-0">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Email</h4>
                  <p className="text-white/70">contato@clinicaazambuja.com.br</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quiz Component instead of Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <QuizComponent inSection={true} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 