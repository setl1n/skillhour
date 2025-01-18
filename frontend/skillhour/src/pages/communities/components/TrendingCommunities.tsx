import { useEffect, useState } from 'react';
import communitiesService, { Community } from '../../../services/CommunitiesService';
import Card from '../../../components/Card';

interface CommunityCardProps {
    community: Community;
}

const CommunityCard = ({ community }: CommunityCardProps) => {
    return (
        <Card>
            <h3 className="text-xl font-semibold mb-2">{community.name}</h3>
            <div className="text-gray-600 mb-4">
                <p>{community.posts.length} posts</p>
                <p>{community.lessonIds.length} lessons</p>
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors">
                View Community
            </button>
        </Card>
    );
};

const TrendingCommunities = () => {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const data = await communitiesService.getAllCommunities();
                setCommunities(data);
            } catch {
                setError('Failed to load communities');
            } finally {
                setLoading(false);
            }
        };

        fetchCommunities();
    }, []);

    if (loading) return <div>Loading communities...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Trending Communities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communities.map((community) => (
                    <CommunityCard key={community.id} community={community} />
                ))}
            </div>
        </div>
    );
};

export default TrendingCommunities;
