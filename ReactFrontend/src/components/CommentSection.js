import React, {useState} from 'react';
import './CommentSection.css';
function CommentSection(){
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!newComment.trim()) return;
        const comment = {
            text:newComment,
            timestamp: new Date().toISOString(),
            author:"Anonymous",
        };
        setComments([comment, ...comments]);
        setNewComment('');
    };
    const timeAgo = (dateStr) =>{
        const now = new Date();
        const past = new Date(dateStr);
        const diff = now - past;
        const minutes = Math.floor(diff/60000);
        if(minutes<60) return `${minutes} min ago`;
        const hours = Math.floor(minutes / 60);
        if(hours < 24) return `${hours} hours ago`;
        return `${Math.floor(hours/24)} days ago`;
    };
    return(
        <div className='comment-section'>
            <h3>Comments</h3>
            <form onSubmit={handleSubmit} className='comment-form'>
                <textarea 
                    placeholder='What do you think?'
                    value={newComment}
                    onChange={(e)=> setNewComment(e.target.value)}
                />
                <button type='submit'>Post</button>
            </form>
            <ul className='comment-list'>
                {comments.map((c, i) => (
                    <li key={i} className='comment'>
                        <div className='comment-author'>{c.author}</div>
                        <div className='comment-time'>{timeAgo(c.timestamp)}</div>
                        <div className='comment-text'>{c.text}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default CommentSection;