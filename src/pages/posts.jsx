import React from 'react';
import supabase from '../supabaseClient';
import { useState, useEffect } from 'react';

import DiscussionCard from '../Components/DiscussionCard.jsx';

const posts = () => {

    const [fetchError, setFetchError] = useState(null);
    const [posts, setPosts] = useState([]);
    const [orderBy, setOrderBy] = useState('created_at')
    const [searchQuery, setSearchQuery] = useState('');


    const handleDelete = async (id) => {
        setPosts(prevPosts => {
            return prevPosts.filter(post => post.id !== id)
        }
        )
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('discussion')
                .select()
                .order(orderBy, {ascending: false})

            if (error) { 
                setFetchError('No discussion found')
                setPosts(null)
                console.log(error)
            }
            if (data) {
                const filteredPosts = data.filter(post =>
                    post.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setPosts(filteredPosts);
                setFetchError(null);
            }
        }
         fetchPosts();
    }, [orderBy, searchQuery]);



    return (
        <div>
          {fetchError && <h1>{fetchError}</h1>}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button
              onClick={() => console.log('Search clicked')} // Add your search logic here
              className="search-button"
            >
              Search
            </button>
          </div>
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Date</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('upvote')}>Rating</button>
          </div>
          {posts && (
            <div className="discussion-grid">
              {posts.map((post) => (
                <DiscussionCard
                  key={post.id}
                  post={post}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      );
      
}

export default posts;