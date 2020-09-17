import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPost } from '../../actions/posts';
import { connect } from 'react-redux';

const Post = ({ getPost, posts: { loading, post }, match }) => {

    useEffect(() => {
        getPost(match.params.postId)
    }, [getPost, match.params.postId]);

    if (post === null) return <p>single post is loading....</p>

    console.log(post);
    return (
        <Fragment>
            <section>
                <div className='container'>
                    <div className="back-home">
                        <Link to='/'><button className="btn">home</button></Link>
                    </div>
                    <hr/>
                    <div className='single-post'>
                        <h3>{post.title}</h3>
                        <div className='post-info'>
                            <small >by:{' '}<em className='post-author'> {post.name} </em></small>
                            <small className='post-date' >{post.date.slice(0,10)}</small>
                        </div> 
                        <p>{post.content}</p>
                    </div>
                    <hr/>
                    
                </div>
            </section>
        </Fragment>
    )
}

Post.propTypes = {
    posts: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    posts: state.posts
})

export default connect(mapStateToProps, { getPost })(Post)
