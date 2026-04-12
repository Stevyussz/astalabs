'use client';
// src/components/ui/Input.tsx
import { InputHTMLAttributes, forwardRef, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, className, id, style, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {label && (
          <label
            htmlFor={inputId}
            style={{ fontSize: 13, fontWeight: 600, color: 'rgba(226,232,240,0.85)', letterSpacing: '0.02em' }}
          >
            {label}
          </label>
        )}
        <div style={{ position: 'relative' }}>
          {leftIcon && (
            <span style={{
              position: 'absolute', top: 0, bottom: 0, left: 0,
              display: 'flex', alignItems: 'center', paddingLeft: 14,
              pointerEvents: 'none', zIndex: 10,
              color: isFocused ? '#00ff88' : 'rgba(226,232,240,0.4)',
              transition: 'color 0.2s',
            }}>
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
            onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
            style={{
              width: '100%', height: 48, borderRadius: 12,
              background: isFocused ? 'rgba(8,11,16,1)' : 'rgba(8,11,16,0.85)',
              border: error 
                ? '1px solid rgba(239,68,68,0.5)'
                : isFocused ? '1px solid #00ff88' : '1px solid rgba(255,255,255,0.15)',
              color: '#e2e8f0', fontSize: 14, fontFamily: 'Inter, sans-serif',
              padding: `0 16px 0 ${leftIcon ? 44 : 16}px`,
              outline: 'none',
              boxShadow: error && isFocused 
                ? '0 0 0 4px rgba(239,68,68,0.1)'
                : isFocused ? '0 0 0 4px rgba(0,255,136,0.15)' : 'none',
              transition: 'all 0.2s ease',
              opacity: props.disabled ? 0.5 : 1,
              cursor: props.disabled ? 'not-allowed' : 'text',
              ...style,
            }}
            {...props}
          />
        </div>
        {error && <p style={{ fontSize: 12, color: '#f87171', fontWeight: 500, margin: 0 }}>{error}</p>}
        {hint && !error && <p style={{ fontSize: 12, color: 'rgba(226,232,240,0.5)', margin: 0 }}>{hint}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
