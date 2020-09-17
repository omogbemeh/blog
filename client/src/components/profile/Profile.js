import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../actions/profile';

const Profile = ({ getUser, profile : { user }}) => {
    useEffect(() => {
        getUser()
    }, [getUser])

    if (user === null) return <p>Your Profile is loading</p>
    console.log(user);

    return (
        <div>
            <p>Hello { user.name }</p>
        </div>
    )
}

Profile.propTypes = {
    getUser: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getUser })(Profile)
