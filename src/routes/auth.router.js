import express from "express";
import { UserModel } from "../dao/models/users.model.js";
import { isUser, isAdmin } from "../middlewares/auth.js";
import passport from "passport";
export const authRouter = express.Router()

authRouter.get('/profile', isUser, (req, res) => {
    const user = { email: req.session.email, isAdmin: req.session.isAdmin };
    return res.render('profile', { user: user });
});

authRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).render('error', { error: 'session couldnt be closed' });
        }
        return res.redirect('/auth/login');
    });
});

authRouter.get('/administration', isUser, isAdmin, (req, res) => {
    return res.send('Data');
});

authRouter.get('/products', (req, res) => {
    try {
        const user = UserModel.findOne({ email: req.session.email });
        if (user) {
            const userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin,
            };
            return res.render('products', { user: userData });
        } else {
            return res.render('products', { user: null });
        }
    } catch (error) {
        console.error(error);
        return res.render('products', { user: null, error: 'Error retrieving user data' });
    }
});

authRouter.get('/login', (req, res) => {
    return res.render("login", {});
});

authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), async (req, res) => {
    if (!req.user) {
        return res.json({ error: 'invalid credentials' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin };

    return res.json({ msg: 'ok', payload: req.user });
});

authRouter.get('/faillogin', async (req, res) => {
    return res.json({ error: 'fail to login' });
});


authRouter.get('/register', (req, res) => {
    return res.render("register", {});
});

authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failregister' }), (req, res) => {
    if (!req.user) {
        return res.json({ error: 'something went wrong' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin };

    return res.json({ msg: 'ok', payload: req.user });
});

authRouter.get('/failregister', async (req, res) => {
    return res.json({ error: 'fail to register' });
});
