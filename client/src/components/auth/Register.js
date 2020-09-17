import React, { useState } from 'react';
import { registerUser } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Redirect } from'react-router-dom';

const Register = ({ registerUser, auth: { isAuthenticated } }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async e => {
        e.preventDefault()
        if (password !== password2) {
            window.alert('Passwords do not match')
        }
        registerUser(formData)
    }

    if(isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <section>
            <div className='container'>
                <div className='register'>
                    <h3>Register</h3>
                    <form className='register-form' onSubmit={e => onSubmit(e)}>
                        <input type="text" name='name' placeholder='Name' value={name} onChange={e => {onChange(e)}}/>
                        <input type="email" name='email' placeholder='Email' value={email} onChange={e => {onChange(e)}}/>
                        <input type="password" name='password' placeholder='Password' value={password} onChange={e => {onChange(e)}}/>
                        <input type="password" name='password2' placeholder='Confirm Your Password' value={password2} onChange={e => {onChange(e)}}/>
                        <button>Sign Up</button>
                    </form>
                </div>
            </div>
        </section>
       
    )
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { registerUser })(Register)
