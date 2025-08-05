// src/components/common/Button/Button.tsx
import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx'; // For merging Tailwind classes, install with: npm install clsx
import { motion } from 'framer-motion';

// Define the available button variants
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

// Define the available button sizes
type ButtonSize = 'sm' | 'md' | 'lg';

// Define the props for your Button component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leadingIcon?: ReactNode; // Icon before the text
  trailingIcon?: ReactNode; // Icon after the text
  children: ReactNode; // Button text or other content
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leadingIcon,
  trailingIcon,
  children,
  className,
  disabled,
  ...rest // Capture any other standard HTML button attributes
}) => {
  // Base styles for the button (Tailwind CSS classes)
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-75';

  // Variant-specific styles
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-100 focus:ring-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  // Size-specific styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Disabled state styles
  const disabledStyles = 'opacity-50 cursor-not-allowed';
  const loadingStyles = 'cursor-wait animate-pulse'; // Simple loading animation

  const mergedClassName = clsx(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    { [disabledStyles]: disabled || isLoading },
    { [loadingStyles]: isLoading },
    className // Allow overriding or adding custom classes
  );

  return (
    <motion.div
        className='text-center mb-2'
    >
        <motion.button
            whileHover={{scale: 1.02, background:"#2650C0"}}
            className="bg-[#265DC4] text-white font-family-sans font-bold text-base w-[147px] h-[45px] rounded-[13px] shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]"
        >
            {children}
        </motion.button>
    </motion.div>
  );
};

export default Button;
