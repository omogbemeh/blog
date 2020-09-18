const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const auth = require('../../middleware/auth')

// Get a user
router.get('/:user', async (req, res) => {
    try {
        const user = await User.findById(req.params.user).select('-password')
        res.json(user)
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error')
    }
})
// Create a profile
router.post('/', auth, async (req, res) => {
    const { 
        dob,
        bio,
        location,
        website,
        twitter,
        youtube,
        instagram,
        mail
     } = req.body

    try {        
        const newProfile = {
            dob,
            bio,
            location,
            website,
            user: req.user.id
        }

        newProfile.socials = {
            twitter,
            youtube,
            instagram,
            mail
        }

        const profile = await Profile.findOneAndUpdate(
            {user: req.user.id},
            {$set: newProfile},
            {new: true,
            upsert: true}
        )
        res.json(profile)

    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error')
    }
})

// Get all profiles
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error')
    }
})

// Get a particular profile
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findById({ user: req.user.id }).populate('user', ['name', 'avatar']);
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error')
    }
});

// Get A profile By ID
router.get('/:id', async (req, res) => {
    try {
        const profile = await Profile.findById({ user: req.params.user_id}).populate('user', ['name', 'avatar']);
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error')
    }
})

// Delete A profile
router.delete('/me', auth, async (req, res) => {
    try {   
        const profile = await Profile.findOneAndRemove({ user: req.user.id})
        res.json('User Removed')   
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error')
    }
    
})

module.exports = router