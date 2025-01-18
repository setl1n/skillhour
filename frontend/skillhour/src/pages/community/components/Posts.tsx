import { Post } from '../../../services/CommunitiesService';
import { formatDistanceToNow } from 'date-fns';

interface PostsProps {
    posts: Post[];
}

const Posts = ({ posts }: PostsProps) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Community Posts</h2>
            <div className="space-y-4">
                {posts.map((post) => (
                    <div 
                        key={post.id} 
                        className="bg-surface/30 backdrop-blur-md rounded-lg p-6"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
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
                        </div>
                        <h4 className="text-lg font-medium mb-2">{post.title}</h4>
                        <p className="text-text/80">{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;
