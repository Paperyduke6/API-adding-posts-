import React, { useState } from 'react';
import { useGetPostsQuery } from '../services/postsApi';
import AddPostForm from './AddPostForm';
import { Post } from '../types/Post';

const PostsList = () => {
    const { data: posts, error, isLoading } = useGetPostsQuery({});
    const [localPosts, setLocalPosts] = useState<Post[]>([]);

    const handlePostAdded = (newPost: Post) => {
        setLocalPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching posts.</div>;

    const allPosts = [...localPosts, ...(posts || [])]; 

    return (
        <div>
            <h1>Posts</h1>
            <AddPostForm onPostAdded={handlePostAdded} />
            <ul>
                {allPosts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>User ID: {post.userId}</p>
                        <p>Completed: {post.completed ? 'Yes' : 'No'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsList;
