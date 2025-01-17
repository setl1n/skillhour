import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

const Card = ({ children, className = '' }: CardProps) => {
    return (
        <div className={`bg-surface p-6 rounded-lg shadow-soft ${className}`}>
            {children}
        </div>
    );
};

export default Card;
