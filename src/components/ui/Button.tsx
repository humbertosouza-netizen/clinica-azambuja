import React from 'react';
import { cn } from '@/lib/utils';
import { redirectToWhatsApp, CLINIC_PHONE } from '@/utils/whatsapp';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  whatsapp?: boolean;
  phone?: string;
  whatsappMessage?: string;
  service?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    children, 
    whatsapp = false,
    phone = CLINIC_PHONE,
    whatsappMessage,
    service,
    onClick,
    ...props 
  }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Se for um botão de WhatsApp, redirecionar
      if (whatsapp) {
        e.preventDefault();
        redirectToWhatsApp({
          phone,
          message: whatsappMessage,
          service
        });
      }
      
      // Executar o onClick original, se existir
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <button
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          
          // Variant styles
          variant === 'primary' && 'bg-primary text-white hover:opacity-90',
          variant === 'secondary' && 'bg-nude text-primary hover:opacity-90',
          variant === 'outline' && 'border border-primary text-primary hover:bg-primary/10',
          variant === 'ghost' && 'text-primary hover:bg-primary/10',
          
          // Size styles
          size === 'sm' && 'px-3 py-1.5 text-sm',
          size === 'md' && 'px-5 py-2.5 text-base',
          size === 'lg' && 'px-6 py-3 text-lg',
          
          className
        )}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button'; 