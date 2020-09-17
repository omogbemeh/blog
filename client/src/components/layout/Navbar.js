import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const Navbar = ({ auth: { loading, isAuthenticated } }) => {
    const [hideMenu, toggleHideMenu] = useState(false)
    return (
        <header >
            <div>
                <nav className={`nav ${hideMenu && 'open'}`}>
                        <Link style={{ textDecoration: 'none' }} to='/'><h4 className='logo'>NPS</h4></Link>
                        <div onClick={e => toggleHideMenu(!hideMenu)} className='menu-togglers'>
                            <i className="fas fa-times"></i>
                            <i className="fas fa-bars"></i>
                        </div>
                        <ul className='nav-list'>
                            <li onClick={e => toggleHideMenu(!hideMenu)} className='nav-link'>About</li>
                            <li onClick={e => toggleHideMenu(!hideMenu)} className='nav-link'>Poets</li>
                            <li onClick={e => toggleHideMenu(!hideMenu)} className='nav-link'>Contact</li>
                            <Link to='/login'><li className='nav-link'>Login</li></Link>
                            <Link to='/register'><li className='nav-link'>Register</li></Link>
                        </ul>
                </nav>
            </div>
        </header>
    )
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Navbar)