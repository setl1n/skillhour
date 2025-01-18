import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import communitiesService, { Post } from '../../../services/CommunitiesService';
import Card from '../../../components/Card';

const PostCard = ({ post }: { post: Post }) => {
    const navigate = useNavigate();
    
    return (
        <div 
            onClick={() => navigate(`/post/${post.id}`)}
            className="cursor-pointer transition-all duration-200 hover:scale-[1.02]"
        >
            <Card>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                    <span>{post.comments.length} comments</span>
                    <span>{post.likes} likes</span>
                    <span>{post.dislikes} dislikes</span>
                </div>
            </Card>
        </div>
    );
};

const TrendingPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const communities = await communitiesService.getAllCommunities();
                const allPostsPromises = communities.map(community => 
                    communitiesService.getCommunityPosts(community.id)
                );
                const allPostsArrays = await Promise.all(allPostsPromises);
                const allPosts = allPostsArrays.flat();
                
                // Sort posts by total engagement (likes + dislikes) and take top 4
                const sortedPosts = allPosts
                    .sort((a, b) => (b.likes + b.dislikes) - (a.likes + a.dislikes))
                    .slice(0, 4);
                
                setPosts(sortedPosts);
            } catch {
                setError('Failed to load posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div>Loading posts...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Trending Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default TrendingPosts;
