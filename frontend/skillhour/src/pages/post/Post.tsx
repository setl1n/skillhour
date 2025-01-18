import { useParams } from 'react-router-dom';

const Post = () => {
    const { id } = useParams();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Post {id}</h1>
            {/* Post content will be implemented later */}
        </div>
    );
};

export default Post;
