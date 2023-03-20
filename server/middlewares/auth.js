const admin = require('../firebase');
const User = require('../models/user');
const USER_ROLES = require('../constants/user-roles');

exports.authCheck = async (req, res, next) => {
    try {
        const firebaseUser = await admin
            .auth()
            .verifyIdToken(req.headers.authtoken);
        // console.log(firebaseUser);
        req.user = firebaseUser;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            error: 'Invalid or expired token'
        });
    }
};

exports.adminCheck = async (req, res, next) => {
    try {
        const { email } = req.user;
        const adminUser = await User
            .findOne({ email: email })
            .exec();
        // console.log(adminUser);
        if (adminUser.role !== USER_ROLES.admin) {
            res.status(403).json({
                error: 'Admin resource. Access denied.'
            });
        } else {
            next();
        }
    } catch (error) {
        // console.log(error);
        throw new Error(error);
    }
};