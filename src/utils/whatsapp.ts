export interface WhatsAppRedirectOptions {
  phone?: string;
  message?: string;
  service?: string;
}

export const CLINIC_PHONE = "5566996410251"; // Número da clínica (substituir pelo número correto)

/**
 * Função que gera uma URL para redirecionamento ao WhatsApp com mensagem personalizada
 */
export const redirectToWhatsApp = (options: WhatsAppRedirectOptions = {}) => {
  const {
    phone = CLINIC_PHONE,
    message = "Olá, gostaria de agendar uma avaliação.",
    service = ""
  } = options;

  // Personalizar a mensagem com base no serviço selecionado
  let customMessage = message;
  if (service) {
    customMessage = `Olá, gostaria de agendar uma avaliação para ${service}.`;
  }

  // Codificar a mensagem para URL
  const encodedMessage = encodeURIComponent(customMessage);
  
  // Criar a URL do WhatsApp
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
  
  // Redirecionar para o WhatsApp
  window.open(whatsappUrl, '_blank');
}; 