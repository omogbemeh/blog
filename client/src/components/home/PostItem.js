import React, { Fragment } from 'react';

const PostItem = ({ post }) => {

    if ( post === null) return <p>Post is loading</p>

    return <Fragment>
            <section className='posts'>
                    <div className="post-item">
                        <h3>{post.title}</h3>
                        <p>{post.content.slice(0,100)}</p>
                        <em>{post.name}</em>
                        <p>{post.date}</p>
                    </div>
            </section>
        </Fragment>
        
}

export default PostItem
