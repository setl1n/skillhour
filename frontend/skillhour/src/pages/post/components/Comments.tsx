import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Comment } from '../../../services/CommunitiesService';
import { formatDistanceToNow } from 'date-fns';
import communitiesService from '../../../services/CommunitiesService';
import { RootState } from '../../../store/store';

interface CommentsProps {
    postId: number;
    comments: Comment[];
    onCommentAdded: (comment: Comment) => void;
}

const Comments = ({ postId, comments, onCommentAdded }: CommentsProps) => {
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || isSubmitting || !user) return;

        setIsSubmitting(true);
        try {
            const comment = await communitiesService.addComment(postId, {
                body: newComment,
                author: Number(user.id),
                postedOn: new Date().toISOString(),
            });
            onCommentAdded(comment);
            setNewComment('');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Comments</h2>

            <div className="space-y-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="bg-surface/20 backdrop-blur-md rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <img
                                src={`https://loremfaces.net/96/id/${comment.author}.jpg`}
                                alt={comment.authorData?.username}
                                className="w-8 h-8 rounded-full"
                            />
                            <div>
                                <h3 className="font-semibold">{comment.authorData?.username}</h3>
                                <p className="text-sm text-text/60">
                                    {formatDistanceToNow(new Date(comment.postedOn), { addSuffix: true })}
                                </p>
                            </div>
                        </div>
                        <p className="text-text/80">{comment.body}</p>
                    </div>
                ))}
            </div>

            {isAuthenticated ? (
                <form onSubmit={handleSubmit} className="mt-8">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full p-4 bg-surface/30 backdrop-blur-md rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={3}
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50"
                    >
                        Post Comment
                    </button>
                </form>
            ) : (
                <div className="mt-8 p-4 bg-surface/30 backdrop-blur-md rounded-lg text-center">
                    <p className="text-text/60">Log in to join the conversation</p>
                </div>
            )}
        </div>
    );
};

export default Comments;
