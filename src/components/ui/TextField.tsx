import React, { forwardRef } from 'react';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      required,
      leftIcon,
      rightIcon,
      error,
      helperText,
      className = '',
      containerClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-content-secondary mb-1.5"
          >
            {label}
            {required && <span className="text-status-outOfStock ml-1">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-content-muted pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            required={required}
            className={`w-full text-xs bg-surface-input border rounded-lg text-content-primary placeholder-content-muted focus:outline-none focus:border-brand focus:bg-surface-card transition-colors ${leftIcon ? 'pl-9' : 'px-3.5'
              } ${rightIcon ? 'pr-9' : 'px-3.5'} py-2.5 ${error ? 'border-status-outOfStock focus:border-status-outOfStock' : 'border-border-subtle'
              } ${className}`}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <p className="text-[11px] text-status-outOfStock mt-1 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-content-muted mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
