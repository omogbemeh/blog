const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config')
const User = require('../../models/User');
const gravatar = require('gravatar');

// Register A User
router.post('/', [ 
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists()
 ], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    const { email, name, password } = req.body;

    const avatar = gravatar.url(email, {s: '200', r: 'pg', d: '404'});

    try {
        let user = await User.findOne({ email });

        if(user) {
            res.status(400).json({ msg: 'User already exists'})
        }

        user = new User({
            name,
            avatar,
            email,
            password,
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload, 
            config.get('jwtSecret'), 
            { expiresIn: 360000}, 
            (err, token) => {
                if (err) throw err;
                res.json(token);
                })

    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error')
    }
})

module.exports = router