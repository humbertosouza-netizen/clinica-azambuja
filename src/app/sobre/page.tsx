"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaQuoteLeft, FaInstagram, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';

// Placeholder fallback
const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzMwMmMzNiIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMzIiIGZpbGw9IiNkZTI3NTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5JbWFnZW0gUGxhY2Vob2xkZXI8L3RleHQ+PC9zdmc+";

// Valores da clínica
const values = [
  {
    title: "Excelência",
    description: "Buscamos constantemente a excelência em tudo o que fazemos, desde o atendimento inicial até o acompanhamento pós-procedimento."
  },
  {
    title: "Segurança",
    description: "Priorizamos a segurança de nossos pacientes, utilizando apenas materiais e técnicas certificados e de alta qualidade."
  },
  {
    title: "Personalização",
    description: "Reconhecemos a unicidade de cada paciente, desenvolvendo planos de tratamento personalizados para resultados naturais e harmoniosos."
  },
  {
    title: "Transparência",
    description: "Mantemos uma comunicação clara e honesta sobre procedimentos, resultados esperados e investimentos necessários."
  },
  {
    title: "Inovação",
    description: "Investimos continuamente em tecnologias de ponta e técnicas avançadas para oferecer o que há de melhor em tratamentos estéticos."
  },
  {
    title: "Empatia",
    description: "Acolhemos cada paciente com respeito, escuta atenta e compreensão genuína de suas necessidades e desejos."
  }
];

// Equipe da clínica
const team = [
  {
    name: "Dra. Carla Azambuja",
    role: "Médica Especialista em Estética",
    bio: "Médica formada pela UFMT, com especialização em Harmonização Facial e Corporal. Possui mais de 10 anos de experiência e diversos títulos internacionais em técnicas avançadas de harmonização e rejuvenescimento.",
    image: placeholderImage
  },
  {
    name: "Dra. Mariana Silva",
    role: "Dermatologista",
    bio: "Especialista em dermatologia pela Sociedade Brasileira de Dermatologia, com foco em rejuvenescimento facial e tratamentos de revitalização da pele. Traz para a clínica as mais modernas técnicas em skincare e procedimentos dermatológicos.",
    image: placeholderImage
  },
  {
    name: "Dra. Patrícia Mendes",
    role: "Especialista em Estética Íntima",
    bio: "Médica com formação específica em ginecologia estética e funcional. Referência em procedimentos de harmonização íntima, combinando técnicas minimamente invasivas com resultados excepcionais.",
    image: placeholderImage
  }
];

export default function SobrePage() {
  return (
    <main className="pt-24 pb-16 bg-background">
      <div className="container">
        <Link href="/" className="inline-flex items-center text-primary mb-8 hover:underline">
          <FaArrowLeft className="mr-2" />
          Voltar para a página inicial
        </Link>
        
        {/* Hero Section */}
        <div className="relative w-full h-[40vh] md:h-[60vh] rounded-2xl overflow-hidden mb-12">
          <Image
            src={placeholderImage}
            alt="Sobre a Clínica Azambuja"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <h1 className="heading-lg md:heading-xl text-white mb-4">
              Sobre Nós
            </h1>
            <p className="text-white/80 max-w-2xl text-lg">
              Conheça a Clínica Azambuja, nossa história, valores e equipe dedicada à estética avançada e bem-estar.
            </p>
          </div>
        </div>
        
        {/* Nossa História */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-md text-white mb-6">Nossa História</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="relative w-full h-96 rounded-xl overflow-hidden">
                <Image
                  src={placeholderImage}
                  alt="História da Clínica Azambuja"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="text-white/20 mb-4">
                <FaQuoteLeft size={40} />
              </div>
              <p className="text-white/80 text-lg mb-6">
                A Clínica Azambuja nasceu do sonho da Dra. Carla Azambuja de criar um espaço dedicado à beleza que fosse além dos padrões convencionais, valorizando a individualidade e a naturalidade de cada pessoa.
              </p>
              <p className="text-white/80 text-lg mb-6">
                Fundada em 2015 em Rondonópolis, a clínica rapidamente se destacou por sua abordagem personalizada e resultados excepcionais. Com o crescimento da demanda e o reconhecimento do mercado, ampliamos nossas instalações e equipe, mantendo sempre o compromisso com a excelência e o cuidado personalizado.
              </p>
              <p className="text-white/80 text-lg">
                Hoje, somos referência em harmonização facial, corporal e íntima, combinando técnicas avançadas, tecnologia de ponta e um olhar humano para proporcionar transformações que preservam a autenticidade e realçam a beleza natural de nossos pacientes.
              </p>
            </div>
          </div>
        </section>
        
        {/* Nossos Valores */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-md text-white mb-6">Nossos Valores</h2>
            <p className="text-white/80 text-lg">
              Estes princípios fundamentais norteiam todas as nossas ações e decisões na Clínica Azambuja.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-background/30 border border-white/10 p-6 rounded-xl">
                <h3 className="text-primary text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-white/70">{value.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Nossa Equipe */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-md text-white mb-6">Nossa Equipe</h2>
            <p className="text-white/80 text-lg">
              Conheça nossos especialistas dedicados a proporcionar os melhores tratamentos estéticos com segurança e excelência.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-full h-80 rounded-full overflow-hidden mb-6 mx-auto max-w-[250px]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <h3 className="text-primary text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-white/80 font-medium mb-4">{member.role}</p>
                <p className="text-white/70">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Infraestrutura */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-md text-white mb-6">Nossa Infraestrutura</h2>
            <p className="text-white/80 text-lg">
              A Clínica Azambuja oferece um ambiente acolhedor e sofisticado, equipado com a mais alta tecnologia para garantir conforto, segurança e eficácia em todos os procedimentos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-72 rounded-xl overflow-hidden">
              <Image
                src={placeholderImage}
                alt="Recepção da Clínica"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                <h3 className="text-white font-medium">Recepção acolhedora</h3>
              </div>
            </div>
            
            <div className="relative h-72 rounded-xl overflow-hidden">
              <Image
                src={placeholderImage}
                alt="Sala de Procedimentos"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                <h3 className="text-white font-medium">Salas de procedimentos equipadas</h3>
              </div>
            </div>
            
            <div className="relative h-72 rounded-xl overflow-hidden">
              <Image
                src={placeholderImage}
                alt="Tecnologia Avançada"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                <h3 className="text-white font-medium">Equipamentos de última geração</h3>
              </div>
            </div>
            
            <div className="relative h-72 rounded-xl overflow-hidden">
              <Image
                src={placeholderImage}
                alt="Sala de Consultas"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                <h3 className="text-white font-medium">Salas de consulta privativas</h3>
              </div>
            </div>
          </div>
        </section>
        
        {/* Localização e Contato */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-md text-white mb-6">Onde Estamos</h2>
            <p className="text-white/80 text-lg">
              Visite nossa clínica em Rondonópolis e conheça nossas instalações. Estamos em um local de fácil acesso, com estacionamento disponível.
            </p>
          </div>
          
          <div className="bg-background/30 border border-white/10 p-8 rounded-xl">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/2">
                <div className="relative w-full h-80 rounded-xl overflow-hidden">
                  <Image
                    src={placeholderImage}
                    alt="Mapa da localização"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <h3 className="text-primary text-xl font-bold mb-4">Clínica Azambuja</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-primary mr-3 mt-1" />
                    <p className="text-white/80">
                      R. Irmã Bernada, 925 - Jardim Tropical<br />
                      Rondonópolis - MT, 78715-194
                    </p>
                  </div>
                  
                  <div className="flex items-center">
                    <FaWhatsapp className="text-primary mr-3" />
                    <p className="text-white/80">(66) 99641-0251</p>
                  </div>
                  
                  <div className="flex items-center">
                    <FaInstagram className="text-primary mr-3" />
                    <p className="text-white/80">@azambujaharmonizacao</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Horário de Funcionamento:</h4>
                  <p className="text-white/70">Segunda a Sexta: 8h às 18h</p>
                  <p className="text-white/70">Sábado: 8h às 12h</p>
                </div>
                
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="mt-8"
                  whatsapp={true}
                >
                  Agendar Visita
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 md:p-12 text-center">
          <h2 className="heading-md text-white mb-4">Conheça a Diferença Azambuja</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Agende uma avaliação e descubra como podemos ajudá-lo a alcançar seus objetivos estéticos com segurança, naturalidade e excelência.
          </p>
          <Button 
            variant="primary" 
            size="lg"
            whatsapp={true}
          >
            Agendar Avaliação
          </Button>
        </div>
      </div>
    </main>
  );
} 