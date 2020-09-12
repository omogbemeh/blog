const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    dob: {
        type: Date
    },
    bio: {
        type: String
    },
    location: {
        type: String,
    },
    website: {
        type: String
    },
    socials: {
        twitter: {
            type: String
        },
        youtube: {
            type: String
        },
        instagram: {
            type: String
        },
        mail: {
            type: String
        }
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)