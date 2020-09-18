import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../actions/profile';
import { connect } from 'react-redux';
import { getUserPosts } from '../../actions/posts';
 
import PropTypes from 'prop-types'

const Profile = ({ auth, match, getUser, getUserPosts, profile: { loading, user, userPosts }}) => {
    useEffect(() => {
        getUser(match.params.profileId)
        getUserPosts(match.params.profileId)
    }, [getUser, match.params.profileId])

    if (loading || user === null) return <p>Profile is loading</p>

    if (!loading && userPosts) console.log(userPosts);

    return (
        <section>
            <div className="container">
                    <div className="back-home">
                        <Link to='/'><button className="btn">home</button></Link>
                    </div>
                    <hr/>
                    <div className="profile">
                        
                        <p>{user.name}</p>
                    </div>
            </div>  
        </section>
    )
}

Profile.propTypes = {
    getUser: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getUserPosts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getUser, getUserPosts })(Profile)
