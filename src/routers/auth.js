const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { validateToken } = require('../middleware/Authentication');
const User = require('../app/models/User');

router.post('/login', async (req, res, next) => {
    const data = req.body;

    const isExist = await User.findOne({
        username: data.username,
        password: data.password
    })
        .then((user) => user)
        .catch((error) => next());

    if (isExist !== null) {
        const token = jwt.sign(
            {
                username: isExist.username, id: isExist._id
            },
            "importantsecret");
        res.send({ token });
    } else {
        res.send({ error: 'Invalid User Info' });
    }
})

router.post('/signup', async (req, res, next) => {
    // TODO: handle sign up new accounts
    const data = req.body;

    // Handle sign up:

    const isExist = await User.findOne({ username: data.username })
        .then(user => user);

    if (isExist) {
        res.send({ error: "User already exists" })
    }
    else {

        const user = new User({
            username: data.username,
            password: data.password,
            email: data.email,
        });

        // Store the user in the database
        user.save();

        const token = jwt.sign({ foo: 'bar' }, 'shhhhh');

        res.send({ token: token, user: user })
    }
});

router.get('/logout', validateToken, (req, res, next) => {
    localStorage.removeItem('accessToken');
    res.send("Successfully logged out");
});

router.get('/accounts', async (req, res, next) => {
    await User.find({})
        .then((user) => res.send(user))
})

module.exports = router;
