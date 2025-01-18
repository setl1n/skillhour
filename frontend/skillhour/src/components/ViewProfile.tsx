import { useNavigate } from 'react-router-dom';

interface ViewProfileProps {
    userId: string;
    children: React.ReactNode;
    className?: string;
}

const ViewProfile = ({ userId, children, className = '' }: ViewProfileProps) => {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(`/profile/${userId}`);
    };

    return (
        <div 
            onClick={handleClick} 
            className={`cursor-pointer ${className}`}
            role="button"
            tabIndex={0}
        >
            {children}
        </div>
    );
};

export default ViewProfile;
