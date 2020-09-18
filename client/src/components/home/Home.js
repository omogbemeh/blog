import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import { getPosts } from '../../actions/posts';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import AddPoem from './AddPoem';
import Trending from './Trending';
import { likePost } from '../../actions/posts';

const Home = ({ likePost, getPosts, posts: { loading, posts }, auth }) => {
    useEffect(() => {
        getPosts()
    }, [getPosts])

    if (loading && posts.length === 0) {
        return <p>Home page is Loading..</p>
    }
    const trendingPosts = posts;
    return (
        <Fragment>
            <section id='home'>
                <AddPoem /> 
                    <div className='container'>
                        {
                            posts.map(post => (
                                
                                    <div className='post-item' key={post._id}>
                                        <Link style={{ textDecoration: 'none' }} to={`/posts/${post._id}`}><h3>{post.title}</h3></Link>
                                        <Link style={{ textDecoration: 'none' }} to={`/posts/${post._id}`}><p>{post.content.slice(0,50)}</p></Link>
                                        <div className='post-info'>
                                            <small >by:{' '}<Link to={`/profile/${post.user}`}><em className='post-author'> {post.name} </em></Link></small>
                                            <small className='post-date' >{post.date.slice(0,10)}</small>
                                        </div> 
                                        
                                    </div>
                                 
                            ))
                        }
                    </div>
            <Trending trendingPosts={trendingPosts} />
            </section>
        </Fragment>
    )
}

Home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    likePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    posts: state.posts,
    auth: state.auth
});

export default connect(mapStateToProps, { getPosts, likePost })(Home)
