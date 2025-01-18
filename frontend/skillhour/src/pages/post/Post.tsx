import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Post as PostType, Comment } from '../../services/CommunitiesService';
import Content from './components/Content';
import Comments from './components/Comments';
import communitiesService from '../../services/CommunitiesService';

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState<PostType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (!id) return;
                const fetchedPost = await communitiesService.getPostById(Number(id));
                setPost(fetchedPost);
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : 'Failed to load post';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleCommentAdded = (newComment: Comment) => {
        if (!post) return;
        setPost({
            ...post,
            comments: [...post.comments, newComment],
        });
    };

    if (loading) return <div>Loading post...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!post) return <div>Post not found</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-8 max-w-4xl"
        >
            <Content post={post} />
            <Comments 
                postId={post.id}
                comments={post.comments}
                onCommentAdded={handleCommentAdded}
            />
        </motion.div>
    );
};

export default Post;
