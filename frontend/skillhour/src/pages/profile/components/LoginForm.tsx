import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { loginAsync, clearError } from '../../../store/auth/authSlice';

const LoginForm = ({ toggleForm }: { toggleForm: () => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearError());
        dispatch(loginAsync(formData));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md">
                    {error}
                </div>
            )}
            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className={`w-full bg-primary text-white py-2 px-4 rounded-md 
                    ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}`}
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
            
            <button
                type="button"
                onClick={toggleForm}
                className="w-full text-center text-sm text-gray-600 hover:text-gray-800 mt-4"
            >
                Don't have an account? Register
            </button>
        </form>
    );
};

export default LoginForm;
