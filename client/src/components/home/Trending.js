import React from 'react';
import { Link } from 'react-router-dom';

const Trending = ({ trendingPosts }) => {

    // This is in descending order of dates
    const trending = trendingPosts.sort((a, b) => a.date < b.date ? 1 : -1)

    return (
        <div id="trending">
            <div className="container">
                <div className="trending">
                    <h3 className='trending-intro'>Trending Right Now</h3>
                    {  
                        trending.map(post => (
                                
                                    <div className='post-item' key={post._id}>
                                        <Link style={{ textDecoration: 'none' }} to={`/${post._id}`}><h3>{post.title}</h3></Link>
                                        <Link style={{ textDecoration: 'none' }} to={`/${post._id}`}><p>{post.content.slice(0,50)}</p></Link>
                                        <div className='post-info'>
                                            <small >by:{' '}<em className='post-author'> {post.name} </em></small>
                                            <small className='post-date' >{post.date.slice(0,10)}</small>
                                        </div>
                                        <div className='like-comment'>
                                            <button><i class="far fa-heart like"></i><span>{post.likes.length}</span></button>
                                            <button><i class="far fa-comments comment"></i><span>{post.comments.length}</span></button>
                                        </div>     
                                    </div>
                                
        
                        ))
                    }
                </div>
            </div>
        </div>
    )
}



export default Trending
