require('dotenv').config();
const express = require('express')
const User = require('../model/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const products = require('../model/productSchema')

exports.renderHome = (async (req, res) => {
    try {
        const showProducts = await products.find()
        res.status(200).json({ message: 'Home page Rendered', products: showProducts })
    } catch (err) {
        res.status(500).json({ message: 'Error rendering in The home Page' })
    }
})

exports.renderRegister = (req, res) => {
    try {
        res.status(200).json({ message: "Page rendered succesfully" })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body
        console.log(`req.body from register${req.body}`)
        const existingUserName = await User.findOne({ username })
        if (existingUserName) {
            return res.status(400).json({ error: 'Username is already taken' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedpass })

        const savedUser = await newUser.save()

        res.status(201).json(savedUser)

    } catch (error) {
        res.status(500).json({ error: 'Something Error Happend', message: error.message })
    }
}

exports.renderLogin = async (req, res) => {
    res.status(200).json({ message: 'Login page rendered' })
}



exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "Invalid user" });

          if (user.isBlocked) {
            return res.status(403).json({ message: "Your account is blocked. Please contact support." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Wrong password" });

        const token = jwt.sign({ userId: user._id }, "the_secret_key", {
            expiresIn: "1h",
        });

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                maxAge: 60 * 60 * 1000,
            })
            .json({
                message: "Login successful",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                },
            });

        console.log(user)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//logout
exports.logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "Lax",
        });
        res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        res.status(500).json({ message: "Logout failed", error: err.message });
    }
};
