import React, { useState } from 'react';
import { useAddPostMutation } from '../services/postsApi';
import { Post } from '../types/Post';

const AddPostForm = ({ onPostAdded }: { onPostAdded: (post: Post) => void }) => {
    const [title, setTitle] = useState('');
    const [userId, setUserId] = useState(1);
    const [completed, setCompleted] = useState(false);
    const [addPost] = useAddPostMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newPost = { userId, title, completed };
            const response = await addPost(newPost).unwrap();
            onPostAdded(response); 
            setTitle('');
            setCompleted(false);
            console.log("Post added to the list successfully") ;
        } catch (error) {
            console.error('Failed to add the post:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a New Post</h2>
            <div>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Completed:
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                    />
                </label>
            </div>
            <button type="submit">Add Post</button>
        </form>
    );
};

export default AddPostForm;
