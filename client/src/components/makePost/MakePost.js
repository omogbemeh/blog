import React, { useState } from 'react'
import { makePost } from '../../actions/posts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

export const MakePost = ({ makePost }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    })

    const { title, content } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        makePost(formData)
    }

    return (
        <div className="container">
            <form onSubmit={e => onSubmit(e)}>
                <textarea className='add-title' type="text" placeholder='Title' name='title' value={title} onChange={e => onChange(e)}/>
                <textarea className='add-content' rows='30' type="text" placeholder='Content' name='content' value={content} onChange={e => onChange(e)}/>
                <button className='btn btn-add' type='submit'>Post Poem</button>
            </form>
        </div>
        
    )
}

MakePost.propTypes = {
    makePost: PropTypes.func.isRequired,
}

export default connect(null, { makePost })(MakePost);