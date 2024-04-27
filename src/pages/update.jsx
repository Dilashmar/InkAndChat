import { useParams, useNavigate } from "react-router-dom"
import {useEffect, useState} from 'react';
import supabase from '../supabaseClient';

const update = () => {
    const {id} = useParams();
    const navigate = useNavigate;

    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState(''); 
    const [upvote, setUpvote] = useState(0);
    const [formError, setFormError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title || !caption || !upvote) {
            setFormError('Title and Caption are required')
            return
        }

        const {data, error} = await supabase
        .from('discussion')
        .update({title, caption, upvote})
        .eq('id', id)

        if (error) {
            setFormError('An error occurred')
            console.log(error)
        }

        if (data) {
            setFormError(null)
            navigate('/')
        }




    };

    useEffect(() => {
        const fetchPost = async () => {
            const {data, error} = await supabase
            .from('discussion')
            .select()
            .eq('id', id)
            .single()

            if (error) {
                navigate("/", {replace: true})
            }
            if (data) {
                setTitle(data.title)
                setCaption(data.caption)    
                setUpvote(data.upvote) 
            }
        
        }

        fetchPost
    
    }, [id, navigate]);


    return (
        <div>
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

                <button>Update Post</button>  
                {formError && <p>{formError}</p>} 
            </form>
    
        </div>
    )


}

export default update;