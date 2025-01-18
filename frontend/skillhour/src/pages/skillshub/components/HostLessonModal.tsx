import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../../components/Modal';
import { RootState } from '../../../store/store';
import { createLesson } from '../../../store/lesson/lessonSlice';
import type { AppDispatch } from '../../../store/store';
import communitiesService, { Community } from '../../../services/CommunitiesService';
import { formatDateToJavaFormat } from '../../../utils/timeUtils';

interface HostLessonModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const HostLessonModal = ({ isOpen, onClose }: HostLessonModalProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = useSelector((state: RootState) => state.auth.user);
    const [communities, setCommunities] = useState<Community[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [formData, setFormData] = useState({
        skillTaught: '',
        maxCapacity: 1,
        date: '', // Changed from dateTime
        time: '09:00', // Added new time field with default
        duration: 60, // duration in minutes
        isOnline: false,
        location: '',
        communityId: '',
    });
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Available options for dropdowns
    const capacityOptions = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20];
    const durationOptions = Array.from({ length: 12 }, (_, i) => (i + 1) * 15); // 15 to 180 minutes in steps of 15

    // Generate time options in 15-minute intervals
    const timeOptions = Array.from({ length: 96 }, (_, i) => {
        const hours = Math.floor(i / 4);
        const minutes = (i % 4) * 15;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const allCommunities = await communitiesService.getAllCommunities();
                setCommunities(allCommunities);
            } catch (error) {
                console.error('Failed to fetch communities:', error);
            }
        };
        if (isOpen) {
            fetchCommunities();
        }
    }, [isOpen]);

    const filteredCommunities = communities.filter(community =>
        community.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) {
            console.error('No user logged in');
            return;
        }
        
        try {
            // Combine date and time
            const startDate = new Date(`${formData.date}T${formData.time}`);
            const endDateTime = new Date(startDate.getTime() + formData.duration * 60000);
            
            const newLesson = {
                ...formData,
                dateTime: formatDateToJavaFormat(startDate),
                endDateTime: formatDateToJavaFormat(endDateTime),
                instructorId: Number(currentUser.id),
                studentIds: [],
                state: 'UPCOMING' as const,
                reviewedStudents: [],
                teacherReviewers: [],
                communityId: formData.communityId ? Number(formData.communityId) : undefined
            };
            
            await dispatch(createLesson(newLesson)).unwrap();
            onClose();
        } catch (error) {
            console.error('Failed to create lesson:', error);
        }
    };

    const selectedCommunity = communities.find(c => c.id.toString() === formData.communityId);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="bg-surface/30 backdrop-blur-md rounded-xl p-6">
                <h2 className="text-2xl font-bold text-primary mb-6">Host a New Lesson</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-text/80 mb-2">Skill to Teach</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg border border-text/10 bg-surface/50 focus:border-primary focus:ring-1 focus:ring-primary text-text transition duration-200"
                                value={formData.skillTaught}
                                onChange={(e) => setFormData({...formData, skillTaught: e.target.value})}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text/80 mb-2">Maximum Capacity</label>
                                <select
                                    className="w-full px-4 py-2 rounded-lg border border-text/10 bg-surface/50 focus:border-primary focus:ring-1 focus:ring-primary text-text"
                                    value={formData.maxCapacity}
                                    onChange={(e) => setFormData({...formData, maxCapacity: parseInt(e.target.value)})}
                                    required
                                >
                                    {capacityOptions.map(option => (
                                        <option key={option} value={option}>
                                            {option} student{option > 1 ? 's' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div ref={dropdownRef}>
                                <label className="block text-sm font-medium text-text/80 mb-2">
                                    Host Community (Optional)
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-lg border border-text/10 bg-surface/50 focus:border-primary focus:ring-1 focus:ring-primary text-text"
                                        placeholder="Search communities..."
                                        value={selectedCommunity ? selectedCommunity.name : searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setFormData({...formData, communityId: ''});
                                            setShowDropdown(true);
                                        }}
                                        onFocus={() => setShowDropdown(true)}
                                    />
                                    {showDropdown && (
                                        <div className="absolute z-10 w-full mt-1 bg-surface/95 backdrop-blur-md rounded-lg shadow-lg max-h-60 overflow-auto border border-text/10">
                                            {filteredCommunities.length > 0 ? (
                                                filteredCommunities.map(community => (
                                                    <div
                                                        key={community.id}
                                                        className="px-4 py-2 hover:bg-primary/10 cursor-pointer text-text transition-colors"
                                                        onClick={() => {
                                                            setFormData({...formData, communityId: community.id.toString()});
                                                            setSearchTerm('');
                                                            setShowDropdown(false);
                                                        }}
                                                    >
                                                        {community.name}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-4 py-2 text-text/60">No communities found</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text/80 mb-2">Start Date</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 rounded-lg border border-text/10 bg-surface/50 focus:border-primary focus:ring-1 focus:ring-primary text-text"
                                    value={formData.date}
                                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text/80 mb-2">Start Time</label>
                                <select
                                    className="w-full px-4 py-2 rounded-lg border border-text/10 bg-surface/50 focus:border-primary focus:ring-1 focus:ring-primary text-text"
                                    value={formData.time}
                                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                                    required
                                >
                                    {timeOptions.map(time => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text/80 mb-2">Duration</label>
                                <select
                                    className="w-full px-4 py-2 rounded-lg border border-text/10 bg-surface/50 focus:border-primary focus:ring-1 focus:ring-primary text-text"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                                    required
                                >
                                    {durationOptions.map(minutes => (
                                        <option key={minutes} value={minutes}>
                                            {minutes} minutes {minutes === 60 ? '(1 hour)' : minutes === 120 ? '(2 hours)' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-text/10 text-primary focus:ring-primary"
                                    checked={formData.isOnline}
                                    onChange={(e) => setFormData({...formData, isOnline: e.target.checked})}
                                />
                                <span className="text-sm text-text/80">Online Lesson</span>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text/80 mb-2">Location</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg border border-text/10 bg-surface/50 focus:border-primary focus:ring-1 focus:ring-primary text-text"
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                placeholder={formData.isOnline ? "Meeting URL" : "Physical location"}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-text/10 text-text/60 hover:bg-surface/50 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white transition duration-200"
                        >
                            Create Lesson
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default HostLessonModal;
