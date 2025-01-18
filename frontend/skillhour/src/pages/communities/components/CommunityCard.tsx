import { Community } from '../../../services/CommunitiesService';

interface CommunityCardProps {
    community: Community;
}

const CommunityCard = ({ community }: CommunityCardProps) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{community.name}</h3>
            <div className="text-gray-600 mb-4">
                <p>{community.posts.length} posts</p>
                <p>{community.lessonIds.length} lessons</p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                View Community
            </button>
        </div>
    );
};

export default CommunityCard;
