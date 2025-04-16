"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { FaFaceSmile, FaPersonRunning, FaHeart, FaFaceFrown, FaWandMagicSparkles, FaCalendarCheck, FaClock, FaSun, FaCalendarDays, FaWhatsapp } from 'react-icons/fa6';

// Tipos das opções de resposta
type Objetivo = 'rosto' | 'corpo' | 'intimo' | null;
type Medo = 'dor' | 'artificial' | 'recuperacao' | null;
type Inicio = 'hoje' | 'mes' | 'pesquisando' | null;

// Interface para as respostas do quiz
interface QuizResponses {
  objetivo: Objetivo;
  medo: Medo;
  inicio: Inicio;
}

// Componente QuizComponent
export const QuizComponent = ({ inSection = false }: { inSection?: boolean }) => {
  // Estado para controlar a etapa atual do quiz
  const [step, setStep] = useState<number>(0);
  // Estado para armazenar as respostas
  const [responses, setResponses] = useState<QuizResponses>({
    objetivo: null,
    medo: null,
    inicio: null
  });
  // Estado para controlar a exibição do quiz
  const [showQuiz, setShowQuiz] = useState<boolean>(inSection ? true : false);
  // Estado para controlar se o quiz foi concluído
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Efeito para mostrar o quiz após algum tempo (apenas para o quiz flutuante)
  useEffect(() => {
    if (!inSection) {
      const timer = setTimeout(() => {
        setShowQuiz(true);
      }, 8000); // Mostrar após 8 segundos
      
      return () => clearTimeout(timer);
    }
  }, [inSection]);

  // Função para selecionar uma opção
  const selectOption = (tipo: 'objetivo' | 'medo' | 'inicio', valor: Objetivo | Medo | Inicio) => {
    setResponses(prev => ({
      ...prev,
      [tipo]: valor
    }));
  };

  // Função para avançar para a próxima etapa
  const nextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  // Função para voltar para a etapa anterior
  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // Função para reiniciar o quiz
  const resetQuiz = () => {
    setResponses({
      objetivo: null,
      medo: null,
      inicio: null
    });
    setStep(0);
    setQuizCompleted(false);
  };

  // Determinar o CTA personalizado com base nas respostas
  const getPersonalizedCTA = () => {
    // CTA padrão
    let ctaText = "Agendar Avaliação";
    let ctaSubText = "Nossa equipe está pronta para atender você";
    
    // Personalizar com base no objetivo
    if (responses.objetivo === 'rosto') {
      ctaText = "Agendar Avaliação de Harmonização Facial";
      ctaSubText = "Uma consulta personalizada para avaliar suas necessidades faciais específicas e recomendar os melhores tratamentos.";
    } else if (responses.objetivo === 'corpo') {
      ctaText = "Agendar Avaliação de Estética Corporal";
      ctaSubText = "Uma avaliação completa para definir o melhor protocolo de tratamento corporal para seus objetivos.";
    } else if (responses.objetivo === 'intimo') {
      ctaText = "Agendar Avaliação Confidencial";
      ctaSubText = "Uma conversa privada e profissional sobre tratamentos íntimos, com total confidencialidade.";
    } else {
      ctaText = "Agendar Avaliação Completa";
      ctaSubText = "Um diagnóstico personalizado para entender suas necessidades e criar um plano de tratamento sob medida.";
    }

    // Ajustar com base nos medos
    if (responses.medo === 'dor') {
      ctaSubText += " com procedimentos minimamente invasivos e confortáveis";
    } else if (responses.medo === 'artificial') {
      ctaSubText += " com resultados naturais e harmoniosos";
    } else if (responses.medo === 'recuperacao') {
      ctaSubText += " e recuperação rápida";
    }

    // Ajustar com base na urgência
    if (responses.inicio === 'hoje') {
      ctaText = "Agendar Agora: Avaliação Urgente";
    } else if (responses.inicio === 'mes') {
      ctaText = "Marcar Avaliação Este Mês";
    } else if (responses.inicio === 'pesquisando') {
      ctaText = "Solicitar Mais Informações";
      ctaSubText = "Sem compromisso, tire todas as suas dúvidas";
    }

    return { ctaText, ctaSubText };
  };

  // Obter o CTA personalizado
  const { ctaText, ctaSubText } = getPersonalizedCTA();

  // Função para obter objetivo formatado
  const getObjetivoText = () => {
    if (responses.objetivo === 'rosto') return "Harmonização Facial";
    if (responses.objetivo === 'corpo') return "Tratamentos Corporais";
    if (responses.objetivo === 'intimo') return "Harmonização Íntima";
    return "Avaliação Geral";
  };

  // Função para obter texto do medo
  const getMedoText = () => {
    if (responses.medo === 'dor') return "Preocupação com dor";
    if (responses.medo === 'artificial') return "Medo de resultado artificial";
    if (responses.medo === 'recuperacao') return "Preocupação com tempo de recuperação";
    return "";
  };

  // Função para obter texto de urgência
  const getUrgenciaText = () => {
    if (responses.inicio === 'hoje') return "Deseja começar o quanto antes";
    if (responses.inicio === 'mes') return "Planeja começar este mês";
    if (responses.inicio === 'pesquisando') return "Está apenas pesquisando";
    return "";
  };

  // Função para redirecionar para WhatsApp com as informações do quiz
  const redirectToWhatsApp = () => {
    const phoneNumber = "5566996410251"; // Número da clínica
    const objetivo = getObjetivoText();
    const medo = getMedoText();
    const urgencia = getUrgenciaText();
    
    const message = `Olá! Acabei de fazer o teste no site da Clínica Azambuja e gostaria de agendar uma avaliação.\n\n*MEUS RESULTADOS*\n- Objetivo: ${objetivo}\n- ${medo}\n- ${urgencia}\n\nGostaria de mais informações sobre ${ctaText}.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  // Variantes para animação
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  // Condição para não exibir o quiz flutuante
  if (!showQuiz && !inSection) {
    return null;
  }

  // Classes condicionais baseadas no local de exibição
  const containerClasses = inSection 
    ? "bg-background border border-white/10 rounded-xl overflow-hidden" 
    : "fixed bottom-8 left-8 z-30 max-w-sm w-full";

  const quizClasses = inSection
    ? "bg-background border border-primary/20 rounded-xl shadow-xl overflow-hidden"
    : "bg-background border border-primary/20 rounded-xl shadow-xl overflow-hidden";

  // HTML do componente
  return (
    <motion.div 
      initial={{ opacity: 0, scale: inSection ? 1 : 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={containerClasses}
    >
      <div className={quizClasses}>
        {/* Cabeçalho do Quiz */}
        <div className="bg-primary/10 p-4 text-center relative">
          {!inSection && (
            <button 
              onClick={() => setShowQuiz(false)} 
              className="absolute top-2 right-2 text-white/80 hover:text-white"
            >
              ✕
            </button>
          )}
          <h3 className="text-lg font-semibold text-white">
            {quizCompleted ? "Obrigado por Responder!" : "Teste Rápido: Qual Seu Objetivo?"}
          </h3>
          {!quizCompleted && (
            <div className="flex items-center justify-center mt-2">
              <span className={`w-3 h-3 rounded-full mx-1 ${step === 0 ? 'bg-primary' : 'bg-primary/30'}`}></span>
              <span className={`w-3 h-3 rounded-full mx-1 ${step === 1 ? 'bg-primary' : 'bg-primary/30'}`}></span>
              <span className={`w-3 h-3 rounded-full mx-1 ${step === 2 ? 'bg-primary' : 'bg-primary/30'}`}></span>
            </div>
          )}
        </div>
        
        {/* Conteúdo do Quiz */}
        <div className="p-5">
          {!quizCompleted ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {step === 0 && (
                  <div>
                    <h4 className="text-white text-center mb-4">Você quer...?</h4>
                    <div className="space-y-3">
                      <button 
                        onClick={() => selectOption('objetivo', 'rosto')}
                        className={`w-full flex items-center p-3 rounded-lg border transition-all ${
                          responses.objetivo === 'rosto' 
                            ? 'bg-primary/20 border-primary' 
                            : 'bg-background border-primary/30 hover:bg-primary/10'
                        }`}
                      >
                        <FaFaceSmile className={`mr-3 ${responses.objetivo === 'rosto' ? 'text-primary' : 'text-white/80'}`} />
                        <span className="text-white">Rostinho rejuvenescido</span>
                      </button>
                      
                      <button 
                        onClick={() => selectOption('objetivo', 'corpo')}
                        className={`w-full flex items-center p-3 rounded-lg border transition-all ${
                          responses.objetivo === 'corpo' 
                            ? 'bg-primary/20 border-primary' 
                            : 'bg-background border-primary/30 hover:bg-primary/10'
                        }`}
                      >
                        <FaPersonRunning className={`mr-3 ${responses.objetivo === 'corpo' ? 'text-primary' : 'text-white/80'}`} />
                        <span className="text-white">Corpo esculpido</span>
                      </button>
                      
                      <button 
                        onClick={() => selectOption('objetivo', 'intimo')}
                        className={`w-full flex items-center p-3 rounded-lg border transition-all ${
                          responses.objetivo === 'intimo' 
                            ? 'bg-primary/20 border-primary' 
                            : 'bg-background border-primary/30 hover:bg-primary/10'
                        }`}
                      >
                        <FaHeart className={`mr-3 ${responses.objetivo === 'intimo' ? 'text-primary' : 'text-white/80'}`} />
                        <span className="text-white">Confiança íntima</span>
                      </button>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <h4 className="text-white text-center mb-4">Tem medo de...?</h4>
                    <div className="space-y-3">
                      <button 
                        onClick={() => selectOption('medo', 'dor')}
                        className={`w-full flex items-center p-3 rounded-lg border transition-all ${
                          responses.medo === 'dor' 
                            ? 'bg-primary/20 border-primary' 
                            : 'bg-background border-primary/30 hover:bg-primary/10'
                        }`}
                      >
                        <FaFaceFrown className={`mr-3 ${responses.medo === 'dor' ? 'text-primary' : 'text-white/80'}`} />
                        <span className="text-white">Dor</span>
                      </button>
                      
                      <button 
                        onClick={() => selectOption('medo', 'artificial')}
                        className={`w-full flex items-center p-3 rounded-lg border transition-all ${
                          responses.medo === 'artificial' 
                            ? 'bg-primary/20 border-primary' 
                            : 'bg-background border-primary/30 hover:bg-primary/10'
                        }`}
                      >
                        <FaWandMagicSparkles className={`mr-3 ${responses.medo === 'artificial' ? 'text-primary' : 'text-white/80'}`} />
                        <span className="text-white">Resultado artificial</span>
                      </button>
                      
                      <button 
                        onClick={() => selectOption('medo', 'recuperacao')}
                        className={`w-full flex items-center p-3 rounded-lg border transition-all ${
                          responses.medo === 'recuperacao' 
                            ? 'bg-primary/20 border-primary' 
                            : 'bg-background border-primary/30 hover:bg-primary/10'
                        }`}
                      >
                        <FaCalendarCheck className={`mr-3 ${responses.medo === 'recuperacao' ? 'text-primary' : 'text-white/80'}`} />
                        <span className="text-white">Tempo de recuperação</span>
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h4 className="text-white text-center mb-4">Quando quer começar?</h4>
                    <div className="space-y-3">
                      <button 
                        onClick={() => selectOption('inicio', 'hoje')}
                        className={`w-full flex items-center p-3 rounded-lg border transition-all ${
                          responses.inicio === 'hoje' 
                            ? 'bg-primary/20 border-primary' 
                            : 'bg-background border-primary/30 hover:bg-primary/10'
                        }`}
                      >
                        <FaClock className={`mr-3 ${responses.inicio === 'hoje' ? 'text-primary' : 'text-white/80'}`} />
                        <span className="text-white">Hoje</span>
                      </button>
                      
                      <button 
                        onClick={() => selectOption('inicio', 'mes')}
                        className={`w-full flex items-center p-3 rounded-lg border transition-all ${
                          responses.inicio === 'mes' 
                            ? 'bg-primary/20 border-primary' 
                            : 'bg-background border-primary/30 hover:bg-primary/10'
                        }`}
                      >
                        <FaSun className={`mr-3 ${responses.inicio === 'mes' ? 'text-primary' : 'text-white/80'}`} />
                        <span className="text-white">Este mês</span>
                      </button>
                      
                      <button 
                        onClick={() => selectOption('inicio', 'pesquisando')}
                        className={`w-full flex items-center p-3 rounded-lg border transition-all ${
                          responses.inicio === 'pesquisando' 
                            ? 'bg-primary/20 border-primary' 
                            : 'bg-background border-primary/30 hover:bg-primary/10'
                        }`}
                      >
                        <FaCalendarDays className={`mr-3 ${responses.inicio === 'pesquisando' ? 'text-primary' : 'text-white/80'}`} />
                        <span className="text-white">Apenas pesquisando</span>
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center">
                <h4 className="text-white text-xl mb-3">Recomendamos para você:</h4>
                <div className="bg-primary/5 p-4 rounded-lg mb-4">
                  <p className="text-white/80 text-sm">{ctaSubText}</p>
                </div>
                <Button 
                  variant="primary" 
                  className="w-full mb-3 flex items-center justify-center"
                  onClick={redirectToWhatsApp}
                >
                  <FaWhatsapp className="mr-2" />
                  {ctaText}
                </Button>
                <button 
                  onClick={resetQuiz}
                  className="text-primary/70 text-sm hover:text-primary"
                >
                  Refazer o teste
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Botões de navegação */}
        {!quizCompleted && (
          <div className="p-4 bg-background/40 border-t border-primary/10 flex justify-between">
            {step > 0 ? (
              <button 
                onClick={prevStep}
                className="text-white/80 hover:text-white text-sm"
              >
                « Voltar
              </button>
            ) : (
              <div></div>
            )}
            
            <button 
              onClick={nextStep}
              disabled={(step === 0 && !responses.objetivo) || 
                (step === 1 && !responses.medo) || 
                (step === 2 && !responses.inicio)}
              className={`px-4 py-2 rounded-md text-sm ${
                ((step === 0 && !responses.objetivo) || 
                (step === 1 && !responses.medo) || 
                (step === 2 && !responses.inicio))
                  ? 'bg-gray-500/50 text-white/50 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              {step === 2 ? 'Ver Resultado' : 'Próximo »'}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default QuizComponent; 