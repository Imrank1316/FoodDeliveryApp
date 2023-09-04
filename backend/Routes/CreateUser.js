
const express = require('express');

const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')

const secKey = "MyNameisMohammedImranAbdulNayeemKhan@softwareDeveloper"


router.post('/createUser', [
    body('email').isEmail(),
    body('password', 'Incorrect password').isLength({ min: 5 }),
    body('name').isLength({ min: 5 })

]
    ,
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                locations: req.body.locations
            }).then(res.json({ success: true }))
            

        } catch (error) {
            console.log(error);
            res.json({ success: false })

        }
    })

router.post('/loginuser',
    [
        body('email').isEmail(),
        body('password', 'Incorrect password').isLength({ min: 5 }),

    ]

    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;

        try {
            let userData = await User.findOne({ email })
            if (!userData) {
                return res.status(400).json({ errors: "try login with different credentials" })
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);

            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try with different credentials" })
            }

            const data = {
                user : {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, secKey)

            return res.json({ success: true, authToken: authToken })

        } catch (error) {
            console.log(error)
            res.json({ success: false })

        }
    })

module.exports = router;