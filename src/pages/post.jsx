import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabaseClient';

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data: postData, error } = await supabase
        .from('discussion')
        .select()
        .eq('id', postId)
        .single();

      if (error) {
        console.error('Error fetching post:', error.message);
      } else if (postData) {
        setPost(postData);
        fetchComments();
      }

      setLoading(false);
    };

    fetchPost();
  }, [postId]);

  const fetchComments = async () => {
    const { data: commentsData, error } = await supabase
      .from('discussion') 
      .select()
      .eq('id', postId); 

    if (error) {
      console.error('Error fetching comments:', error.message);
    } else if (commentsData) {
      setComments(commentsData);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const { data, error } = await supabase.from('discussion').insert([
      { id: postId, comment: newComment },
    ]);

    if (error) {
      console.error('Error adding comment:', error.message);
    } else if (data) {
      setNewComment('');
      fetchComments();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found!</div>;
  }

  return (
    <div className="single-post">
      <h2>{post.title}</h2>
      <p>{post.caption}</p>
      <div className="upvote">Rating: {post.upvote}</div>


      <div className="comment-section">
        <h3>Comments</h3>
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.comment}</p>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment..."
          />
          <button type="submit">Submit Comment</button>
        </form>
      </div>
    </div>
  );
};

export default Post;
