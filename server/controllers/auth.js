const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
    const { name, picture, email } = req.user;
    const user = await User.findOneAndUpdate(
        { email: email },
        { name: name, picture: picture },
        { new: true }
    );
    if (user) {
        res.json(user);
    } else {
        const newUser = await new User({
            email: email,
            name: name,
            picture: picture
        }).save();
        res.json(newUser);
    }
};

exports.currentUser = async (req, res) => {
    await User.findOne({ email: req.user.email })
        .exec()
        .then(user => {
            console.log(user);
            res.json(user);
        })
        .catch(err => {
            throw new Error(err);
        });
};