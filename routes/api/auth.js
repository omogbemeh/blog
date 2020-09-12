const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')

// login route
router.post('/', [ 
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }   
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'This email isnt registered '})
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'This email isnt registered '})
        }
       
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 36000 },
            (err, token) => {
               if (err) throw err
               res.json({ token })
                }
            )
        

        
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error')
    }
})

// Delete an Account
router.delete('/:id', auth, async (req, res) => {
    try {
        await User.findOneAndRemove({ _id: req.user.id });
        res.json('Profile not found');
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error')
    }
});

module.exports = router