import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProfileInfo from '../../components/ProfileInfo';
import { Toaster } from 'react-hot-toast';
import userService, { User } from '../../services/UserService';

const Profile = () => {
    const { userId } = useParams();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const [showLogin, setShowLogin] = useState(true);
    const [profileUser, setProfileUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userId) {
            setLoading(true);
            userService.getUser(userId)
                .then(fetchedUser => {
                    setProfileUser(fetchedUser);
                })
                .catch(error => {
                    console.error('Error fetching user:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else if (user) {
            setProfileUser(user);
        }
    }, [userId, user]);

    if (!userId && !isAuthenticated) {
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

    if (loading) {
        return (
            <div className="container mx-auto px-8 py-6">
                <p className="text-center">Loading profile...</p>
            </div>
        );
    }

    return profileUser ? <ProfileInfo user={profileUser} /> : null;
};

export default Profile;
