import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  href, 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 font-heading font-bold uppercase tracking-widest transition-all duration-300 text-sm md:text-base";
  
  const variants = {
    primary: "bg-brand-crimson text-white hover:bg-white hover:text-brand-black border border-brand-crimson hover:border-white",
    secondary: "bg-white text-brand-black hover:bg-brand-crimson hover:text-white border border-white hover:border-brand-crimson",
    outline: "bg-transparent text-[#FFFFFF] border border-white hover:bg-white hover:text-brand-black",
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}