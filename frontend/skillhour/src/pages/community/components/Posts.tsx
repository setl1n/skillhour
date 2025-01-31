import { Post } from '../../../services/CommunitiesService';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import ViewProfile from '../../../components/ViewProfile';

interface PostsProps {
    posts: Post[];
}

const Posts = ({ posts }: PostsProps) => {
    const navigate = useNavigate();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Community Posts</h2>
            <div className="space-y-4">
                {posts.map((post) => (
                    <div 
                        key={post.id} 
                        className="bg-surface/30 backdrop-blur-md rounded-lg p-6
                                 transition-all duration-200 hover:bg-surface/40"
                    >
                        <div className="flex items-center gap-6">
                            <ViewProfile userId={post.author.toString()}>
                                <div className="flex items-center gap-3 min-w-fit hover:bg-surface/50 p-2 rounded-lg transition-colors">
                                    <img 
                                        src={`https://loremfaces.net/96/id/${post.author}.jpg`}
                                        alt={post.authorData?.username}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{post.authorData?.username}</h3>
                                        <p className="text-sm text-text/60">
                                            {formatDistanceToNow(new Date(post.postedOn), { addSuffix: true })}
                                        </p>
                                    </div>
                                </div>
                            </ViewProfile>
                            <div 
                                className="flex-1 min-w-0 cursor-pointer"
                                onClick={() => navigate(`/post/${post.id}`)}
                            >
                                <h4 className="text-lg font-medium mb-1 truncate">{post.title}</h4>
                                <p className="text-text/80 line-clamp-1">{post.content}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;
