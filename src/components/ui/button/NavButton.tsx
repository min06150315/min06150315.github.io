import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface NavButtonProps {
  to?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'black' | 'primary';
  className?: string;
}

export const NavButton = ({
  to,
  onClick,
  children,
  variant = 'black',
  className = '',
}: NavButtonProps) => {
  const baseStyles = 'px-3 py-2 rounded-md transition-colors';

  const variants = {
    black: 'hover:bg-hover-black',
    primary:
      'px-4 py-1.5 bg-blue-600 hover:bg-blue:500 text-white rounded-full transition-all',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to as string} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};
