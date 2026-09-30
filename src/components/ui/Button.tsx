import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold transition active:scale-95 disabled:opacity-30 disabled:pointer-events-none disabled:active:scale-100 shrink-0';

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-brand hover:bg-brand-hover text-brand-contrast shadow-sm',
    secondary:
      'bg-surface-button hover:bg-surface-hover border border-border-subtle text-content-primary',
    ghost:
      'text-content-secondary hover:bg-surface-hover hover:text-content-primary',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-4 py-2 text-xs rounded-lg gap-2',
    icon: 'w-8 h-8 rounded-lg flex items-center justify-center p-0',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
