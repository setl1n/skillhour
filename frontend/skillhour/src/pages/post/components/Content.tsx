import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { Post } from '../../../services/CommunitiesService';
import { formatDistanceToNow } from 'date-fns';
import { RootState } from '../../../store/store';
import { motion } from 'framer-motion';
import ViewProfile from '../../../components/ViewProfile';

interface ContentProps {
    post: Post;
}

const Content = ({ post }: ContentProps) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [votes, setVotes] = useState({
        likes: post.likes,
        dislikes: post.dislikes,
        userVote: null as 'like' | 'dislike' | null
    });
    const [tooltipPosition, setTooltipPosition] = useState<'like' | 'dislike' | null>(null);

    const handleVote = (voteType: 'like' | 'dislike') => {
        if (!isAuthenticated) return;

        setVotes(prev => {
            const currentVote = prev.userVote;
            let likes = prev.likes;
            let dislikes = prev.dislikes;

            // Remove previous vote if exists
            if (currentVote === 'like') likes--;
            if (currentVote === 'dislike') dislikes--;

            // Add new vote if different from current
            if (currentVote !== voteType) {
                if (voteType === 'like') likes++;
                if (voteType === 'dislike') dislikes++;
            }

            return {
                likes,
                dislikes,
                userVote: currentVote === voteType ? null : voteType
            };
        });
    };

    return (
        <div className="bg-surface/30 backdrop-blur-md rounded-lg p-8">
            <ViewProfile userId={post.author.toString()}>
                <div className="flex items-center gap-4 mb-6 hover:bg-surface/50 p-2 rounded-lg transition-colors">
                    <img 
                        src={`https://loremfaces.net/96/id/${post.author}.jpg`}
                        alt={post.authorData?.username}
                        className="w-12 h-12 rounded-full"
                    />
                    <div>
                        <h3 className="font-semibold">{post.authorData?.username}</h3>
                        <p className="text-sm text-text/60">
                            {formatDistanceToNow(new Date(post.postedOn), { addSuffix: true })}
                        </p>
                    </div>
                </div>
            </ViewProfile>

            <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
            <p className="text-lg text-text/80 mb-8 leading-relaxed">{post.content}</p>

            <div className="relative flex items-center gap-6">
                <div 
                    className="relative"
                    onMouseEnter={() => !isAuthenticated && setTooltipPosition('like')}
                    onMouseLeave={() => setTooltipPosition(null)}
                >
                    <button 
                        onClick={() => handleVote('like')}
                        disabled={!isAuthenticated}
                        className={`flex items-center gap-2 ${
                            votes.userVote === 'like' 
                            ? 'text-green-500' 
                            : 'text-text/60 hover:text-green-500'
                        } transition-colors`}
                    >
                        <FaThumbsUp />
                        <span>{votes.likes}</span>
                    </button>
                </div>
                <div 
                    className="relative"
                    onMouseEnter={() => !isAuthenticated && setTooltipPosition('dislike')}
                    onMouseLeave={() => setTooltipPosition(null)}
                >
                    <button 
                        onClick={() => handleVote('dislike')}
                        disabled={!isAuthenticated}
                        className={`flex items-center gap-2 ${
                            votes.userVote === 'dislike' 
                            ? 'text-red-500' 
                            : 'text-text/60 hover:text-red-500'
                        } transition-colors`}
                    >
                        <FaThumbsDown />
                        <span>{votes.dislikes}</span>
                    </button>
                </div>
                {tooltipPosition && !isAuthenticated && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 -top-10 px-3 py-1 text-sm 
                            bg-black text-white rounded whitespace-nowrap"
                        style={{
                            transform: `translateX(${tooltipPosition === 'like' ? '0%' : '100%'})`
                        }}
                    >
                        Sign in to vote
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Content;

