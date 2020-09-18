import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOut } from '../../actions/auth';

const Navbar = ({ logOut, auth: { loading, isAuthenticated } }) => {
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
                            { !loading && isAuthenticated ? <Link to='/login'><li onClick={e => { logOut(); toggleHideMenu(!hideMenu)}} className='nav-link'>logout</li></Link>: <Link to='/login'><li onClick={e => toggleHideMenu(!hideMenu)} className='nav-link'>Login</li></Link>}
                            { !loading && !isAuthenticated && <Link to='/register'><li onClick={e => toggleHideMenu(!hideMenu)} className='nav-link'>Register</li></Link>}
                        </ul>
                </nav>
            </div>
        </header>
    )
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(Navbar)