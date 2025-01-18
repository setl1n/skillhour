import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProfileInfo from '../../components/ProfileInfo';
import { Toaster } from 'react-hot-toast';

const Profile = () => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const [showLogin, setShowLogin] = useState(true);

    if (!isAuthenticated) {
        return (
            <>
                <Toaster position="top-center" />
                <div className="container mx-auto px-8 py-6">
                    <h1 className="text-2xl font-bold mb-6 text-center">
                        {showLogin ? 'Login' : 'Register'}
                    </h1>
                    {showLogin ? (
                        <LoginForm toggleForm={() => setShowLogin(false)} />
                    ) : (
                        <RegisterForm toggleForm={() => setShowLogin(true)} />
                    )}
                </div>
            </>
        );
    }

    return user ? <ProfileInfo user={user} /> : null;
};

export default Profile;
