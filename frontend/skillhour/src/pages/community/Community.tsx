import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import communitiesService, { Community as CommunityType } from '../../services/CommunitiesService';
import UpcomingLessons from './components/UpcomingLessons';
import Posts from './components/Posts';

const Community = () => {
    const { id } = useParams();
    const [community, setCommunity] = useState<CommunityType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCommunity = async () => {
            try {
                if (!id) return;
                const data = await communitiesService.getCommunityById(Number(id));
                setCommunity(data);
            } catch {
                setError('Failed to load community');
            } finally {
                setLoading(false);
            }
        };

        fetchCommunity();
    }, [id]);

    if (loading) return <div>Loading community...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!community) return <div>Community not found</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-8 py-6"
        >
            <h1 className="text-3xl font-bold mb-8">{community.name}</h1>
            <div className="space-y-12">
                <UpcomingLessons lessonIds={community.lessonIds} />
                <Posts posts={community.posts} />
            </div>
        </motion.div>
    );
};

export default Community;
