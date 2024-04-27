import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../supabaseClient';

const DiscussionCard = ({ post, onDelete }) => {
  const [count, setCount] = useState(() => {
    // Retrieve count from localStorage or use 0 if not found
    const storedCount = localStorage.getItem(`upvote_${post.id}`);
    return storedCount ? parseInt(storedCount, 10) : 0;
  });

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('discussion')
      .delete()
      .eq('id', post.id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log('deleted');
      onDelete(post.id);
    }
  };

  const updateCount = async (event) => {
    event.preventDefault();

    await supabase
      .from('discussion')
      .update({ count: count + 1 })
      .eq('id', post.id);

    setCount((prevCount) => prevCount + 1);
    localStorage.setItem(`upvote_${post.id}`, count + 1); // Store count in localStorage
  };

  return (
    <Link to={`/post/${post.id}`} className="discussion-card-link">
      <div className="discussion-card">
        <div>
          <h3>{post.title}</h3>
          <p>{post.caption}</p>
          <div className="rating">
            <span className="rating-label">Rating:</span>
            <span className="rating-value">{post.upvote}</span>
          </div>
          <button className="betButton" onClick={updateCount}>
            Upvote: {count}
          </button>
        </div>
        <div className="buttons">
          <Link to={`/${post.id}`} className="edit-link">
            <button className="material-icons">edit</button>
          </Link>
          <button className="material-icons" onClick={handleDelete}>
            delete
          </button>
        </div>
      </div>
    </Link>
  );
};

export default DiscussionCard;
