"use client"

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';

// Placeholder fallback
const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzMwMmMzNiIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMzIiIGZpbGw9IiNkZTI3NTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5JbWFnZW0gUGxhY2Vob2xkZXI8L3RleHQ+PC9zdmc+";

const treatments = [
  {
    id: 'emagrecimento',
    title: 'Emagrecimento Rápido',
    description: 'Protocolos personalizados que combinam técnicas avançadas para aceleração do metabolismo, redução de medidas e perda de peso de forma saudável e eficiente.',
    benefits: [
      'Perda de peso acelerada e segura',
      'Redução significativa de medidas',
      'Melhora do metabolismo e disposição',
      'Diminuição da celulite e flacidez',
      'Resultados visíveis em curto período'
    ],
    details: 'Nossos protocolos de emagrecimento rápido combinam técnicas como intradermoterapia, biomodulação metabólica, e orientação nutricional. O tratamento é personalizado após avaliação completa, com duração média de 6-12 semanas dependendo do objetivo.',
    image: '/images/corpo/emagrecimento.jpg',
    ideal: 'Perfeito para quem busca perder peso e reduzir medidas de forma rápida, saudável e com acompanhamento médico, especialmente antes de eventos importantes ou para iniciar uma mudança de estilo de vida.',
    results: 'Nossos pacientes relatam perda média de 5-10kg nos primeiros 30 dias, com melhora significativa de medidas e da composição corporal.'
  },
  {
    id: 'intradermoterapia',
    title: 'Intradermoterapia',
    description: 'Técnica minimamente invasiva que consiste na aplicação de substâncias específicas diretamente na camada dérmica da pele para eliminar gordura localizada e melhorar a qualidade da pele.',
    benefits: [
      'Redução efetiva de gordura localizada',
      'Diminuição do aspecto da celulite',
      'Melhora da firmeza e elasticidade da pele',
      'Definição de contornos corporais',
      'Procedimento rápido com pouco tempo de recuperação'
    ],
    details: 'As sessões de intradermoterapia têm duração de aproximadamente 30 minutos, com protocolos que variam de 4-8 sessões, realizadas semanalmente ou quinzenalmente. Utilizamos combinações personalizadas de ativos que atuam diretamente na gordura localizada.',
    image: '/images/corpo/intradermoterapia.jpg',
    ideal: 'Indicado para quem deseja tratar gordura localizada em áreas específicas como abdômen, flancos, culotes e braços, sem procedimentos invasivos.',
    results: 'Os resultados começam a ser percebidos a partir da 2ª sessão, com redução visível de medidas e melhora da aparência da pele nas áreas tratadas.'
  },
  {
    id: 'gordura',
    title: 'Tratamento de Gordura Localizada',
    description: 'Combinação de procedimentos não cirúrgicos para redução e eliminação da gordura localizada em regiões específicas do corpo, como abdômen, flancos, culotes e braços.',
    benefits: [
      'Redução precisa da gordura em áreas problemáticas',
      'Modelagem corporal sem cirurgia',
      'Melhora do contorno corporal',
      'Tratamentos complementares para tensionamento da pele',
      'Múltiplas técnicas disponíveis para diferentes necessidades'
    ],
    details: 'Utilizamos tecnologias avançadas como ultrassom focalizado, criolipólise, radiofrequência e técnicas injetáveis conforme a necessidade de cada paciente. Os protocolos variam de 1-5 sessões, com intervalos de 15-30 dias entre cada aplicação.',
    image: '/images/corpo/gordura.jpg',
    ideal: 'Perfeito para quem já está próximo do peso ideal, mas possui áreas resistentes de gordura localizada que não respondem a dietas e exercícios físicos.',
    results: 'Redução média de 20-30% do volume de gordura nas áreas tratadas após o protocolo completo, com resultados duradouros quando associados a hábitos saudáveis.'
  },
  {
    id: 'microvasinhos',
    title: 'Tratamento de Microvasinhos',
    description: 'Tratamento para eliminar e reduzir veias superficiais e vasinhos nas pernas e outras áreas do corpo, melhorando tanto a estética quanto aliviando sintomas associados.',
    benefits: [
      'Eliminação de veias superficiais e microvasinhos',
      'Melhora da aparência estética das pernas',
      'Redução de sintomas como dor e sensação de peso',
      'Prevenção do surgimento de novos vasinhos',
      'Procedimento minimamente invasivo'
    ],
    details: 'Utilizamos técnicas como escleroterapia química ou a laser, adaptadas para cada tipo e calibre de vaso sanguíneo. O tratamento requer de 2-6 sessões, dependendo da extensão da área e severidade dos vasinhos, com intervalos de 15-30 dias.',
    image: '/images/corpo/microvasinhos.JPG',
    ideal: 'Recomendado para pessoas com microvasinhos visíveis, especialmente nas pernas, que causam desconforto estético ou sintomas como sensação de peso e cansaço.',
    results: 'Redução significativa da aparência dos vasinhos já nas primeiras sessões, com melhora progressiva ao longo do tratamento e alívio dos sintomas associados.'
  },
  {
    id: 'celulite',
    title: 'Tratamento Avançado para Celulite',
    description: 'Protocolo personalizado para amenizar e reduzir o aspecto da celulite, atuando em suas causas principais: alterações circulatórias, acúmulo de gordura e enfraquecimento do tecido conjuntivo.',
    benefits: [
      'Redução visível do aspecto "casca de laranja"',
      'Melhora da circulação local e drenagem linfática',
      'Aumento da firmeza e elasticidade da pele',
      'Remodelação do tecido conjuntivo',
      'Resultados progressivos e duradouros'
    ],
    details: 'Combinamos técnicas como subcisão, intradermoterapia, radiofrequência e carboxiterapia para resultados otimizados. O protocolo geralmente envolve 6-10 sessões, realizadas semanalmente, com manutenções mensais ou bimestrais após o tratamento inicial.',
    image: '/images/corpo/celulite.jpg',
    ideal: 'Ideal para mulheres que sofrem com celulite de diferentes graus, especialmente nas regiões de glúteos e coxas, e que desejam uma abordagem completa e eficaz para o problema.',
    results: 'Melhora significativa do aspecto da pele e redução do grau de celulite em 70-80% dos casos, com resultados visíveis a partir da 4ª sessão do protocolo.'
  }
];

export default function CorporalPage() {
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const treatmentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Função para rolar suavemente até o tratamento selecionado
  const scrollToTreatment = (treatmentId: string) => {
    if (treatmentRefs.current[treatmentId]) {
      const yOffset = -100; // ajuste para considerar o cabeçalho fixo
      const element = treatmentRefs.current[treatmentId];
      const y = element!.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  // Efeito para rolar até o tratamento quando um é selecionado
  useEffect(() => {
    if (selectedTreatment) {
      scrollToTreatment(selectedTreatment);
    }
  }, [selectedTreatment]);

  // Função que lida com o clique no botão de tratamento
  const handleTreatmentClick = (treatmentId: string) => {
    // Se já está selecionado, desseleciona
    if (treatmentId === selectedTreatment) {
      setSelectedTreatment(null);
    } else {
      // Caso contrário, seleciona o novo e rola até ele
      setSelectedTreatment(treatmentId);
    }
  };

  // Função para definir corretamente a referência
  const setTreatmentRef = (el: HTMLDivElement | null, id: string) => {
    treatmentRefs.current[id] = el;
  };

  return (
    <main className="pt-24 pb-16 bg-background">
      {/* Hero Section */}
      <div className="container">
        <Link href="/" className="inline-flex items-center text-primary mb-8 hover:underline">
          <FaArrowLeft className="mr-2" />
          Voltar para a página inicial
        </Link>
        
        <div className="relative w-full h-[40vh] md:h-[60vh] rounded-2xl overflow-hidden mb-12">
          <Image
            src="/images/services/corpo-tratamentos.jpeg"
            alt="Estética Corporal"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <h1 className="heading-lg md:heading-xl text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Estética Corporal
            </h1>
            <p className="text-white max-w-2xl text-lg md:text-xl font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Tratamentos corporais avançados para modelar o corpo, reduzir medidas e melhorar a qualidade da pele com resultados comprovados.
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-md text-white mb-6">Nossa Abordagem</h2>
          <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed px-2">
            Na Clínica Azambuja, oferecemos tratamentos corporais que combinam técnicas de última geração 
            com protocolos personalizados para garantir os melhores resultados para cada tipo de corpo e objetivo.
          </p>
          <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed px-2">
            Nossos especialistas realizam uma avaliação detalhada para identificar suas necessidades 
            e desenvolver um plano de tratamento específico que atenda às suas expectativas.
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            className="mt-4" 
            whatsapp={true}
            service="Tratamentos Corporais"
          >
            Agendar Avaliação
          </Button>
        </div>

        {/* Tratamentos - Menu de Navegação */}
        <div className="mb-16" id="tratamentos">
          <h2 className="heading-md text-white text-center mb-8">Nossos Tratamentos</h2>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
            {treatments.map((treatment) => (
              <button
                key={treatment.id}
                onClick={() => handleTreatmentClick(treatment.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedTreatment === treatment.id 
                    ? 'bg-primary text-white' 
                    : 'bg-background border border-primary/30 text-white hover:bg-primary/10'
                }`}
              >
                {treatment.title}
              </button>
            ))}
          </div>
          
          {/* Treatments List */}
          <div className="space-y-20">
            {treatments.map((treatment, index) => (
              <div 
                key={treatment.id}
                id={treatment.id}
                ref={(el: HTMLDivElement | null) => {
                  treatmentRefs.current[treatment.id] = el;
                }}
                className="transition-all duration-500 scroll-mt-32 opacity-100"
              >
                <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12`}>
                  {/* Treatment Image */}
                  <div className="w-full md:w-2/5">
                    <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={treatment.image}
                        alt={treatment.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-white text-xl font-bold">{treatment.title}</h3>
                      </div>
                    </div>
                  </div>
                  
                  {/* Treatment Content */}
                  <div className="w-full md:w-3/5">
                    <div className="bg-background/60 backdrop-blur-sm border border-primary/10 rounded-xl p-6 md:p-8 hover:border-primary/20 transition-all shadow-lg">
                      <h3 className="text-primary text-2xl font-bold mb-4">{treatment.title}</h3>
                      <p className="text-white/90 text-base mb-6 leading-relaxed">{treatment.description}</p>
                      
                      <div className="bg-primary/10 backdrop-blur-sm p-5 rounded-lg mb-6 border-l-4 border-primary shadow-sm">
                        <p className="text-white/95 italic text-base leading-relaxed">{treatment.ideal}</p>
                      </div>
                      
                      <h4 className="text-white text-xl font-medium mb-4 flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        Benefícios
                      </h4>
                      <ul className="space-y-3 mb-6 pl-6">
                        {treatment.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start text-white/90 text-base leading-relaxed">
                            <FaCheckCircle className="text-primary mr-2 mt-1 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <h4 className="text-white text-xl font-medium mb-4 flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        Como Funciona
                      </h4>
                      <p className="text-white/90 text-base mb-6 leading-relaxed">{treatment.details}</p>
                      
                      {treatment.results && (
                        <>
                          <h4 className="text-white text-xl font-medium mb-4 flex items-center">
                            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                            Resultados Esperados
                          </h4>
                          <p className="text-white/90 text-base mb-6 leading-relaxed">{treatment.results}</p>
                        </>
                      )}
                      
                      <div className="flex justify-center mt-8">
                        <Button 
                          variant="primary"
                          whatsapp={true}
                          service={treatment.title}
                        >
                          Agendar Avaliação
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 md:p-12 text-center">
          <h2 className="heading-md text-white mb-4">Transforme seu Corpo com Nossa Tecnologia Avançada</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Agende uma avaliação personalizada e descubra quais tratamentos são 
            mais adequados para suas necessidades e objetivos estéticos.
          </p>
          <Button
            variant="primary" 
            size="lg"
            whatsapp={true}
            service="Tratamentos Corporais"
          >
            Agendar Avaliação
          </Button>
        </div>
      </div>
    </main>
  );
} 