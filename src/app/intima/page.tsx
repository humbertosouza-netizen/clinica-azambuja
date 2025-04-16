"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaCheckCircle, FaRegLightbulb } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';

// Placeholder fallback
const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzMwMmMzNiIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMzIiIGZpbGw9IiNkZTI3NTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5JbWFnZW0gUGxhY2Vob2xkZXI8L3RleHQ+PC9zdmc+";

const treatments = [
  {
    id: 'ninfoplastia',
    title: 'Ninfoplastia sem Cortes',
    description: 'Técnica minimamente invasiva para redução e harmonização dos pequenos lábios vaginais sem necessidade de cirurgia tradicional, proporcionando resultados naturais e recuperação rápida.',
    benefits: [
      'Redução e modelagem dos pequenos lábios',
      'Procedimento minimamente invasivo sem cortes',
      'Recuperação rápida e indolor',
      'Resultados naturais e harmoniosos',
      'Aumento da autoconfiança e conforto físico'
    ],
    details: 'A técnica utiliza radiofrequência de alta precisão ou laser para remodelar os tecidos, sem necessidade de cortes cirúrgicos. O procedimento é realizado em consultório, com anestesia local, dura em média 30-40 minutos e permite retorno imediato às atividades cotidianas, com abstinência sexual por 15-20 dias.',
    image: '/images/intimo/ninfoplastia.jpg',
    ideal: 'Indicado para mulheres que sentem desconforto físico ou estético com o tamanho dos pequenos lábios, especialmente em casos de assimetria, hipertrofia ou mudanças após o parto.',
    faq: [
      {
        question: 'É doloroso?',
        answer: 'O procedimento é realizado com anestesia local, garantindo conforto durante a aplicação. Após o procedimento, o desconforto é mínimo e facilmente controlado com medicação oral.'
      },
      {
        question: 'Quanto tempo duram os resultados?',
        answer: 'Os resultados são duradouros, podendo ser permanentes em muitos casos. Fatores como envelhecimento natural, gestações futuras e oscilações hormonais podem influenciar a manutenção dos resultados.'
      }
    ]
  },
  {
    id: 'clareamento',
    title: 'Clareamento Íntimo',
    description: 'Tratamento especializado para uniformizar a coloração da região íntima, reduzindo a hiperpigmentação causada por fatores genéticos, hormonais ou atrito constante.',
    benefits: [
      'Uniformização do tom da pele na região genital',
      'Redução da hiperpigmentação natural',
      'Tratamento seguro e indolor',
      'Aumento da autoestima e conforto',
      'Resultados progressivos e naturais'
    ],
    details: 'Utilizamos peelings enzimáticos e químicos específicos, associados a tecnologias como laser fracionado ou LEDs. O protocolo geralmente inclui 4-6 sessões, realizadas quinzenalmente, com cuidados específicos pós-procedimento para garantir resultados ótimos.',
    image: '/images/intimo/clareamento.jpeg',
    ideal: 'Perfeito para mulheres que se sentem desconfortáveis com o escurecimento da região íntima e desejam uma coloração mais uniforme, recuperando a confiança e bem-estar.',
    faq: [
      {
        question: 'O tratamento mancha a roupa íntima?',
        answer: 'Não. Os produtos utilizados são específicos para a pele e não causam manchas em roupas. Recomendamos apenas o uso de peças de algodão nas primeiras 48h após cada sessão.'
      },
      {
        question: 'Preciso fazer manutenção?',
        answer: 'Após o protocolo inicial, geralmente é recomendada uma manutenção a cada 6-12 meses para preservar os resultados, dependendo da resposta individual ao tratamento.'
      }
    ]
  },
  {
    id: 'preenchimento',
    title: 'Preenchimento Íntimo',
    description: 'Procedimento que utiliza ácido hialurônico para restaurar o volume e a hidratação da região genital, melhorando aspectos estéticos e funcionais, especialmente após perdas de volume relacionadas à idade ou pós-parto.',
    benefits: [
      'Aumento do volume dos grandes lábios',
      'Hidratação profunda dos tecidos íntimos',
      'Melhora da firmeza e sustentação',
      'Redução do ressecamento vaginal',
      'Melhora do conforto e sensibilidade'
    ],
    details: 'O procedimento é realizado com anestesia local, dura aproximadamente 30 minutos e proporciona resultados imediatos que podem durar entre 9-12 meses. A técnica é personalizada para cada paciente após avaliação detalhada da anatomia e necessidades individuais.',
    image: '/images/intimo/preenchimento.jpg',
    ideal: 'Recomendado para mulheres que perderam volume na região dos grandes lábios devido ao envelhecimento ou após gestações, e para quem busca maior conforto e satisfação íntima.',
    faq: [
      {
        question: 'Interfere nas relações sexuais?',
        answer: 'Após o período de 7 dias de recuperação inicial, o preenchimento não interfere nas relações sexuais. Pelo contrário, muitas mulheres relatam maior satisfação sexual devido ao aumento da sensibilidade e conforto.'
      },
      {
        question: 'O resultado fica natural?',
        answer: 'Sim. Utilizamos técnicas que garantem resultados extremamente naturais, respeitando a anatomia individual. O objetivo é realçar e restaurar, nunca exagerar.'
      }
    ]
  },
  {
    id: 'bioestimuladores',
    title: 'Bioestimuladores Íntimos',
    description: 'Tratamentos que estimulam a produção natural de colágeno na região íntima, proporcionando melhora da firmeza, hidratação e elasticidade dos tecidos genitais, com efeitos regenerativos duradouros.',
    benefits: [
      'Aumento da firmeza e elasticidade dos tecidos íntimos',
      'Melhora significativa do trofismo vaginal',
      'Redução do ressecamento e desconforto',
      'Efeito rejuvenescedor natural e progressivo',
      'Resultados duradouros com poucas sessões'
    ],
    details: 'Aplicamos bioestimuladores específicos como ácido poli-L-láctico ou hidroxiapatita de cálcio em pontos estratégicos, estimulando a produção de colágeno. O protocolo envolve 2-3 sessões, com intervalos de 30-45 dias, e resultados progressivos por até 24 meses.',
    image: '/images/intimo/bioestimuladores.jpg',
    ideal: 'Ideal para mulheres que buscam um rejuvenescimento íntimo completo, especialmente no período pós-menopausa ou após múltiplos partos, restaurando a qualidade dos tecidos de forma natural.',
    faq: [
      {
        question: 'Como perceberei os resultados?',
        answer: 'Os resultados são progressivos, com melhora inicial na hidratação e conforto, seguida pela percepção de maior firmeza e elasticidade dos tecidos. Muitas pacientes relatam melhora significativa após a segunda sessão.'
      },
      {
        question: 'O tratamento é seguro?',
        answer: 'Sim. Os bioestimuladores que utilizamos são aprovados para uso médico e aplicados com técnicas específicas para a região íntima, garantindo segurança e eficácia.'
      }
    ]
  },
  {
    id: 'revitalizacao',
    title: 'Revitalização do Ponto G',
    description: 'Procedimento especializado para aumento da sensibilidade na região do ponto G, proporcionando intensificação do prazer sexual e melhora da função orgásmica.',
    benefits: [
      'Aumento da sensibilidade na região do ponto G',
      'Intensificação do prazer sexual',
      'Melhora da função orgásmica',
      'Procedimento rápido e minimamente invasivo',
      'Resultados imediatos e duradouros'
    ],
    details: 'A técnica envolve a aplicação precisa de preenchedores específicos na parede anterior da vagina, onde se localiza o ponto G. O procedimento é realizado com anestesia local, dura aproximadamente 20 minutos, com resultados que podem durar entre 8-12 meses.',
    image: '/images/intimo/revitalizacao.jpg',
    ideal: 'Recomendado para mulheres que desejam intensificar as sensações durante o ato sexual, especialmente aquelas que têm dificuldade para atingir o orgasmo ou notaram redução da sensibilidade com o passar do tempo.',
    faq: [
      {
        question: 'Todas as mulheres podem fazer?',
        answer: 'Sim, a maioria das mulheres pode se beneficiar deste procedimento. Durante a avaliação, realizamos uma análise detalhada para confirmar se você é candidata ideal e adaptar o tratamento às suas necessidades específicas.'
      },
      {
        question: 'É possível retornar às atividades normais no mesmo dia?',
        answer: 'Sim. Por ser minimamente invasivo, você pode retornar às atividades normais imediatamente após o procedimento, exceto relações sexuais, que devem ser evitadas por 3-5 dias.'
      }
    ]
  }
];

export default function IntimaPage() {
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<{[key: string]: number | null}>({});

  const toggleFaq = (treatmentId: string, faqIndex: number) => {
    setExpandedFaq(prev => ({
      ...prev,
      [treatmentId]: prev[treatmentId] === faqIndex ? null : faqIndex
    }));
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
            src="/images/services/intimo-tratamentos.jpeg"
            alt="Harmonização Íntima"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <h1 className="heading-lg md:heading-xl text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Harmonização Íntima
            </h1>
            <p className="text-white max-w-2xl text-lg md:text-xl font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Procedimentos especializados e minimamente invasivos para recuperação da estética e funcionalidade da região íntima feminina.
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-md text-white mb-6">Nossa Abordagem em Estética Íntima</h2>
          <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed px-2">
            Na Clínica Azambuja, abordamos a harmonização íntima com total respeito, privacidade e profissionalismo. 
            Nossos procedimentos visam não apenas a melhoria estética, mas principalmente o resgate do bem-estar, 
            autoestima e qualidade de vida da mulher.
          </p>
          <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed px-2">
            Utilizamos técnicas minimamente invasivas e de última geração, priorizando sempre resultados naturais 
            e seguros. Cada tratamento é personalizado após uma avaliação detalhada e confidencial.
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            className="mt-4"
            whatsapp={true}
            service="Estética Íntima"
          >
            Agendar Avaliação Confidencial
          </Button>
        </div>

        {/* Tratamentos - Menu de Navegação */}
        <div className="mb-16">
          <h2 className="heading-md text-white text-center mb-8">Nossos Tratamentos Íntimos</h2>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
            {treatments.map((treatment) => (
              <button
                key={treatment.id}
                onClick={() => setSelectedTreatment(treatment.id === selectedTreatment ? null : treatment.id)}
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
          <div className="space-y-24">
            {treatments.map((treatment, index) => (
              <div 
                key={treatment.id}
                id={treatment.id}
                className={`transition-all duration-500 ${
                  selectedTreatment && selectedTreatment !== treatment.id ? 'opacity-40' : 'opacity-100'
                }`}
              >
                <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12`}>
                  {/* Treatment Image */}
                  <div className="w-full md:w-2/5">
                    <div className="sticky top-24 relative w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
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
                        <div className="flex">
                          <FaRegLightbulb className="text-primary text-lg mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-white/95 italic text-base leading-relaxed">{treatment.ideal}</p>
                        </div>
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
                      
                      {/* FAQ Section */}
                      <div className="mt-8 space-y-4">
                        <h4 className="text-white text-xl font-medium mb-4 flex items-center">
                          <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                          Perguntas Frequentes
                        </h4>
                        
                        {treatment.faq?.map((item, i) => (
                          <div 
                            key={i} 
                            className="border border-primary/20 rounded-lg overflow-hidden bg-background/40 backdrop-blur-sm shadow-sm"
                          >
                            <button
                              onClick={() => toggleFaq(treatment.id, i)}
                              className="w-full p-4 flex justify-between items-center text-left"
                            >
                              <span className="text-white/90 text-base font-medium">{item.question}</span>
                              <span className="text-primary ml-2">
                                {expandedFaq[treatment.id] === i ? '−' : '+'}
                              </span>
                            </button>
                            
                            {expandedFaq[treatment.id] === i && (
                              <div className="px-4 pb-4 text-white/80 text-base leading-relaxed">
                                {item.answer}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
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
        
        {/* Confidentiality Note */}
        <div className="bg-background/30 border border-white/10 rounded-xl p-6 mb-12 text-center">
          <h3 className="text-primary text-xl font-medium mb-3">Sua Privacidade é Nossa Prioridade</h3>
          <p className="text-white/80 max-w-3xl mx-auto">
            Garantimos absoluta confidencialidade em todas as etapas do seu atendimento, desde a avaliação inicial 
            até o pós-procedimento. Nossa equipe é treinada para proporcionar um ambiente seguro e acolhedor, 
            onde você possa se sentir completamente à vontade para expressar suas necessidades e desejos.
          </p>
        </div>
        
        {/* Call to Action */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 md:p-12 text-center">
          <h2 className="heading-md text-white mb-4">Recupere sua Confiança e Bem-estar</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Agende uma avaliação confidencial para analisar suas necessidades e descubra como nossos 
            tratamentos de harmonização íntima podem melhorar sua qualidade de vida e autoestima.
          </p>
          <Button 
            variant="primary" 
            size="lg"
            whatsapp={true}
            service="Estética Íntima"
          >
            Agendar Avaliação Confidencial
          </Button>
        </div>
      </div>
    </main>
  );
} 