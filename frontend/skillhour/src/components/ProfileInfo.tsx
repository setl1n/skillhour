import { useEffect, useState } from 'react';
import Card from './Card';
import ReviewCard from '../pages/profile/components/ReviewCard';
import { Reviews, User } from '../services/UserService';
import userService from '../services/UserService';

interface ProfileInfoProps {
    user: User;
}

const ProfileInfo = ({ user }: ProfileInfoProps) => {
    const [reviews, setReviews] = useState<Reviews>({ 
        teacherReviews: [], 
        studentReviews: [] 
    });

    useEffect(() => {
        if (user?.id) {
            userService.getUserReviews(user.id.toString())
                .then(fetchedReviews => {
                    setReviews(fetchedReviews);
                })
                .catch(error => {
                    console.error('Error fetching reviews:', error);
                });
        }
    }, [user?.id]);

    return (
        <div className="container mx-auto px-8 py-6">
            <div className="flex gap-6 mb-6">
                <div className="flex-shrink-0 w-[200px]">
                    <img 
                        src="https://loremfaces.net/96/id/1.jpg" 
                        alt="Profile" 
                        className="w-full h-auto rounded-lg"
                    />
                </div>
                
                <Card className="flex-grow">
                    <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
                    <div className="space-y-2">
                        <p><strong>Teaches:</strong> JavaScript, React, TypeScript</p>
                        <p><strong>Interested in:</strong> Python, Machine Learning</p>
                    </div>
                </Card>
            </div>

            <Card className="mb-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Teacher Reviews</h3>
                        <ReviewCard type="teacher" reviews={reviews.teacherReviews} />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Student Reviews</h3>
                        <ReviewCard type="student" reviews={reviews.studentReviews} />
                    </div>
                </div>
            </Card>

            <Card>
                <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
                <p className="text-gray-600">No recent activities</p>
            </Card>
        </div>
    );
};

export default ProfileInfo;
