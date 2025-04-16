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
    id: 'botox',
    title: 'Botox',
    description: 'O botox, ou toxina botulínica, é utilizado para suavizar rugas dinâmicas causadas pela contração muscular. O procedimento relaxa os músculos faciais, diminuindo linhas de expressão e prevenindo o aprofundamento de rugas.',
    image: '/images/facial/botox.jpeg',
    ideal: 'Ideal para quem deseja suavizar rugas da testa, entre as sobrancelhas (glabela) e ao redor dos olhos (pés de galinha).',
    benefits: [
      'Resultado natural e expressivo',
      'Procedimento rápido e minimamente invasivo',
      'Efeito preventivo contra o surgimento de novas rugas',
      'Duração de 4 a 6 meses'
    ],
    details: 'A aplicação é realizada em consultório, sem necessidade de anestesia, com desconforto mínimo. O resultado começa a aparecer entre 3 e 5 dias, com efeito completo em até 15 dias após a aplicação.'
  },
  {
    id: 'preenchimento',
    title: 'Preenchimento Facial',
    description: 'Os preenchedores à base de ácido hialurônico devolvem volume e hidratação à pele, corrigindo sulcos profundos, modelando contornos e restaurando a aparência jovial. São utilizados para lábios, bigode chinês, olheiras e contorno facial.',
    image: '/images/facial/preenchimento.jpeg',
    ideal: 'Perfeito para quem busca volumização labial, correção de olheiras profundas, definição do contorno facial ou atenuação de linhas nasolabiais (bigode chinês).',
    benefits: [
      'Resultados imediatos e naturais',
      'Efeito hidratante na pele',
      'Possibilidade de reversão em caso de insatisfação',
      'Duração de 8 a 18 meses dependendo da área tratada'
    ],
    details: 'O procedimento é realizado com aplicação de anestésico local para conforto. O ácido hialurônico utilizado é de alta qualidade e compatível com o organismo, minimizando riscos de reações alérgicas.'
  },
  {
    id: 'bioestimuladores',
    title: 'Bioestimuladores de Colágeno',
    description: 'Os bioestimuladores promovem a produção natural de colágeno pelo organismo, melhorando a qualidade da pele, sua sustentação e elasticidade. São a escolha ideal para quem busca um rejuvenescimento global e natural.',
    image: '/images/facial/bioestimuladores.jpeg',
    ideal: 'Recomendado para pessoas com flacidez facial, perda de elasticidade ou quem deseja um tratamento preventivo contra o envelhecimento com resultados progressivos e naturais.',
    benefits: [
      'Melhora na qualidade e textura da pele',
      'Efeito lifting sem cirurgia',
      'Resultados progressivos e duradouros',
      'Tratamento que previne o envelhecimento',
      'Duração de 18 a 24 meses'
    ],
    details: 'O procedimento é minimamente invasivo e estimula seu próprio organismo a produzir colágeno de forma natural. Os resultados iniciais são percebidos a partir de 30 dias e seguem melhorando por até 6 meses após a aplicação.'
  },
  {
    id: 'fios',
    title: 'Fios de Sustentação',
    description: 'Os fios de PDO e fios de sustentação são inseridos estrategicamente sob a pele para elevar áreas com flacidez, promovendo um efeito lifting imediato e estimulando a produção de colágeno a longo prazo.',
    image: '/images/facial/fios.jpg',
    ideal: 'Indicado para pessoas com flacidez moderada que buscam um lifting não cirúrgico, especialmente nas áreas do terço médio e inferior da face, como mandíbula, bochechas e pescoço.',
    benefits: [
      'Efeito lifting imediato',
      'Procedimento minimamente invasivo',
      'Melhora progressiva com estímulo de colágeno',
      'Contorno facial mais definido',
      'Duração de 12 a 18 meses'
    ],
    details: 'O procedimento é realizado com anestesia local para conforto total. Os fios são absorvidos naturalmente pelo organismo ao longo do tempo, enquanto o colágeno produzido mantém os resultados.'
  },
  {
    id: 'papada',
    title: 'Lipo de Papada',
    description: 'A lipo de papada é um procedimento que remove o excesso de gordura localizada na região submentoniana (abaixo do queixo), definindo o contorno mandibular e melhorando o perfil facial.',
    image: '/images/facial/papada.jpg',
    ideal: 'Perfeito para pessoas que possuem acúmulo de gordura localizada sob o queixo, mesmo com peso adequado, e que desejam melhorar o contorno facial e o ângulo cervico-mandibular.',
    benefits: [
      'Melhora significativa do contorno mandibular',
      'Procedimento minimamente invasivo',
      'Rápida recuperação',
      'Resultado duradouro',
      'Realizado em consultório'
    ],
    details: 'O procedimento é realizado com anestesia local e utiliza medicamentos injetáveis que promovem a dissolução das células de gordura, que são depois eliminadas naturalmente pelo organismo. Pode ser necessário mais de uma sessão para resultados ótimos.'
  }
];

export default function FacialPage() {
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const treatmentRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

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
            src="/images/services/facial-harmonizacao.jpeg"
            alt="Harmonização Facial"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <h1 className="heading-lg md:heading-xl text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Harmonização Facial
            </h1>
            <p className="text-white max-w-2xl text-lg md:text-xl font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Tratamentos exclusivos de harmonização facial para valorizar sua beleza natural com técnicas avançadas e minimamente invasivas.
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-md text-white mb-6">Nossa Abordagem</h2>
          <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed px-2">
            Na Clínica Azambuja, nossa abordagem em harmonização facial prioriza resultados naturais que realçam sua beleza única. 
            Combinamos técnicas avançadas e um olhar artístico para garantir um equilíbrio perfeito entre ciência e estética.
          </p>
          <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed px-2">
            Cada procedimento é personalizado após uma avaliação detalhada, considerando suas características faciais, estilo de vida 
            e expectativas. Nosso compromisso é proporcionar resultados harmoniosos que preservem suas expressões naturais.
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            className="mt-4" 
            whatsapp={true}
            service="Harmonização Facial"
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
                ref={(el) => setTreatmentRef(el, treatment.id)}
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
          <h2 className="heading-md text-white mb-4">Transforme seu Visual com Harmonização Facial</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Agende uma avaliação personalizada e descubra quais tratamentos são 
            mais adequados para suas necessidades e objetivos estéticos.
          </p>
          <Button 
            variant="primary" 
            size="lg"
            whatsapp={true}
            service="Harmonização Facial"
          >
            Agendar Avaliação
          </Button>
        </div>
      </div>
    </main>
  );
} 