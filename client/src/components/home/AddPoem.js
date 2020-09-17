import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from'react-router-dom';

const AddPoem = ({ auth }) => {

    return (
        <div id='add-post'>
            <div className="container">
                <div className='add-poem'>
                    <div className='add-post'>
                        <h3>Feeling Inspired ?</h3>
                        <Link to='/make-post'><button className='btn btn-add'>Make A Post</button></Link>
                    </div>
                </div>   
            </div>
        </div>
    )
}

AddPoem.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AddPoem)
