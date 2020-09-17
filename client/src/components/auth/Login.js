import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom';

export const Login = ({ loginUser, auth }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        loginUser(formData)
    }

    if(auth.isAuthenticated) {
        return <Redirect to='/'/>
    }
    return (
        <section>
            <div className='container'>
                <div className='register'>
                    <h3>Login</h3>
                    <form className='register-form' onSubmit={e => onSubmit(e)}>
                        <input type="email" name='email' placeholder='Email' value={email} onChange={e => {onChange(e)}}/>
                        <input type="password" name='password' placeholder='Password' value={password} onChange={e => {onChange(e)}}/>
                        <button>Sign In</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(Login);
