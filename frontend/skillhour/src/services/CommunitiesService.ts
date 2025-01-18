import userService, { User } from "./UserService";

export interface Community {
    id: number;
    ownerId: number;
    owner?: User;
    name: string;
    posts: Post[];
    lessonIds: number[];
}

export interface Post {
    id: number;
    title: string;
    content: string;
    likes: number;
    dislikes: number;
    comments: Comment[];
}

export interface Comment {
    id: number;
    body: string;
    postedBy: number;
    author?: User;
    likes: number;
    dislikes: number;
}

class CommunitiesService {
    private baseUrl: string;
    private static instance: CommunitiesService;

    private constructor() {
        this.baseUrl = 'http://localhost:8082/api/communities';
    }

    public static getInstance(): CommunitiesService {
        if (!CommunitiesService.instance) {
            CommunitiesService.instance = new CommunitiesService();
        }
        return CommunitiesService.instance;
    }

    public async getAllCommunities(): Promise<Community[]> {
        const response = await fetch(this.baseUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch communities');
        }
        const communities: Community[] = await response.json();
        return await this.enhanceCommunitiesWithOwners(communities);
    }

    public async getCommunityById(id: number): Promise<Community> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch community');
        }
        const community: Community = await response.json();
        return await this.enhanceCommunityWithOwner(community);
    }

    public async createCommunity(community: Partial<Community>): Promise<Community> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(community)
        });
        if (!response.ok) {
            throw new Error('Failed to create community');
        }
        const newCommunity: Community = await response.json();
        return await this.enhanceCommunityWithOwner(newCommunity);
    }

    public async getCommunityPosts(communityId: number): Promise<Post[]> {
        const response = await fetch(`${this.baseUrl}/${communityId}/posts`);
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return await response.json();
    }

    public async createPost(communityId: number, post: Partial<Post>): Promise<Post> {
        const response = await fetch(`${this.baseUrl}/${communityId}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        if (!response.ok) {
            throw new Error('Failed to create post');
        }
        return await response.json();
    }

    public async addComment(postId: number, comment: Partial<Comment>): Promise<Comment> {
        const response = await fetch(`${this.baseUrl}/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });
        if (!response.ok) {
            throw new Error('Failed to add comment');
        }
        const newComment: Comment = await response.json();
        return await this.enhanceCommentWithAuthor(newComment);
    }

    private async enhanceCommunitiesWithOwners(communities: Community[]): Promise<Community[]> {
        return await Promise.all(
            communities.map(async (community) => await this.enhanceCommunityWithOwner(community))
        );
    }

    private async enhanceCommunityWithOwner(community: Community): Promise<Community> {
        const owner = await userService.getUser(String(community.ownerId));
        return {
            ...community,
            owner
        };
    }

    private async enhanceCommentWithAuthor(comment: Comment): Promise<Comment> {
        const author = await userService.getUser(String(comment.postedBy));
        return {
            ...comment,
            author
        };
    }
}

export const communitiesService = CommunitiesService.getInstance();
export default communitiesService;
