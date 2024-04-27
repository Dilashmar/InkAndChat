import React, { useState } from 'react';
import  supabase from '../supabaseClient';   
import { useNavigate } from 'react-router-dom';


const createPost = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [upvote, setUpvote] = useState(0);
    const [formError, setFormError] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title || !caption || !upvote) {
            setFormError('Title and Caption are required')
            return
        }

        const { data, error } = await supabase
            .from('discussion')
            .insert([
                {title, caption, upvote}
            ])

        if (error) {    
            setFormError('An error occurred')
            console.log(error)
        }
        if (data) {
            console.log('data')
            setFormError(null)
            navigate('/')
        }
        

    
    }

    return (
        <div className='page create'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title: </label>
                <input
                    type='text'
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor='caption'>Caption: </label>
                <textarea
                    id='caption'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                />

                <label htmlFor='upvote'>Rate: </label>
                <input
                    type='number'
                    id='upvote'
                    value={upvote}
                    onChange={(e) => setUpvote(e.target.value)}

                />

                <button>Create Post</button>  
                {formError && <p>{formError}</p>} 
            </form>
        
        </div>
    );
}

export default createPost;