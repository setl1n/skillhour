import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const Profile = () => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const [showLogin, setShowLogin] = useState(true);

    if (!isAuthenticated) {
        return (
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
        );
    }

    return (
        <div className="container mx-auto px-8 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Profile</h1>
            </div>
            <div className="bg-surface p-6 rounded-lg shadow-soft">
                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
                        <p>Name: {user?.name}</p>
                        <p>Email: {user?.email}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Skills</h2>
                        <p>No skills added yet</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
