'use client';
// src/components/ui/Button.tsx
import { ButtonHTMLAttributes, forwardRef, useState } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, className = '', children, disabled, style, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    // Size styles
    const sizing = {
      sm: { height: 32, padding: '0 12px', fontSize: 12, borderRadius: 6 },
      md: { height: 40, padding: '0 20px', fontSize: 14, borderRadius: 8 },
      lg: { height: 48, padding: '0 32px', fontSize: 15, borderRadius: 10 },
    }[size];

    // Variant styles base
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'primary':
          return {
            background: isHovered ? '#00e57a' : '#00ff88',
            color: '#080b10',
            fontWeight: 700,
            border: '1px solid rgba(0,255,136,0.5)',
            boxShadow: isHovered ? '0 0 25px rgba(0,255,136,0.5)' : 'none',
          };
        case 'secondary':
          return {
            background: isHovered ? 'rgba(0,212,255,0.15)' : 'rgba(0,212,255,0.08)',
            color: '#00d4ff',
            fontWeight: 600,
            border: '1px solid rgba(0,212,255,0.3)',
            boxShadow: isHovered ? '0 0 20px rgba(0,212,255,0.3)' : 'none',
          };
        case 'danger':
          return {
            background: isHovered ? 'rgba(239,68,68,0.15)' : 'rgba(239,68,68,0.08)',
            color: '#f87171',
            fontWeight: 600,
            border: '1px solid rgba(239,68,68,0.3)',
            boxShadow: isHovered ? '0 0 20px rgba(239,68,68,0.3)' : 'none',
          };
        case 'success':
          return {
            background: isHovered ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.08)',
            color: '#34d399',
            fontWeight: 600,
            border: '1px solid rgba(16,185,129,0.3)',
          };
        case 'ghost':
        default:
          return {
            background: isHovered ? 'rgba(255,255,255,0.05)' : 'transparent',
            color: isHovered ? '#f8fafc' : 'rgba(226,232,240,0.7)',
            fontWeight: 500,
            border: '1px solid rgba(255,255,255,0.1)',
          };
      }
    };

    const combinedStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
      opacity: disabled || isLoading ? 0.6 : 1,
      transition: 'all 0.2s ease',
      transform: isActive && !disabled && !isLoading ? 'scale(0.98)' : 'scale(1)',
      outline: 'none',
      fontFamily: 'Inter, sans-serif',
      ...sizing,
      ...getVariantStyles(),
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        style={combinedStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsActive(false); }}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        className={className}
        {...props}
      >
        {isLoading && (
          <svg style={{ animation: 'spin 1s linear infinite', height: 16, width: 16 }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
