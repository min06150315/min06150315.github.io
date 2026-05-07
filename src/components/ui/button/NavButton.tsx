import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavButtonProps {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'black' | 'primary';
  className?: string;
}

const NavButton = ({
  children,
  to,
  onClick,
  type = 'button',
  disabled,
  variant = 'black',
  className = '',
}: NavButtonProps) => {
  const baseStyles = 'px-3 py-2 rounded-md transition-colors cursor-pointer';

  const variants = {
    black: 'hover:bg-hover-black',
    primary:
      'px-4 py-1.5 bg-primary-hover hover:bg-primary-hover text-white transition-all',
  };

  const combinedClassName = cn(baseStyles, variants[variant], className);

  if (to) {
    return (
      <Link to={to as string} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  );
};

export default NavButton;
