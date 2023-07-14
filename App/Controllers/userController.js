const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const otpGenerator = require('otp-generator');
const { sendOtp, sendSuccess } = require('../Mailers/mailer.js');
const uuid = require('uuid');
const session = require('express-session');
// MIDDLEWARES
dotenv.config();
const sessionId = uuid.v4();

// REGISTER
const register = async (req, res) => {
    const { name, username, email, password, gender } = req.body;
    if (!req.file) {
        profilePicture = '';
    } else {
        const imgUrl = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'profiles' }).then((result) => { return result.url })
        profilePicture = imgUrl;
    }

    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
        return res.status(400).json({ message: 'Username or Email already exists' });
    }
    try {
        const otp = otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            name,
            username,
            email,
            password: hashedPassword,
            gender,
            profilePicture,
            isVerified: false,
            otp
        });
        await user.save();
        sendOtp(email, name, otp)
        return res.status(201).json({ message: 'User registered successfully', user: user._id });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// VERIFY OTP

const verifyOtp = async (req, res) => {
    const { userId, otp } = req.body;

    const user = await User.findOne({ _id: userId });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const storedOTP = user.otp;
    if (storedOTP === null) {
        return res.status(412).json({ message: 'Email Already Verified...' });
    }
    if (storedOTP !== otp) {
        return res.status(400).json({ message: 'OTP does not match' });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();
    sendSuccess(user.email, user.name);
    res.status(200).json({ message: 'OTP verified' });
};

// GET BY ID

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            const userData = {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
            return res.status(200).json({ userData });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.cookie('sid', sessionId);
        req.session.user = user;
        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred during login' });
    }
};

// LOGOUT
const logout = (req, res) => {
    req.session.user = null;
    res.clearCookie('sid');
    res.status(200).json({ message: 'Logout successful' });
};




module.exports = { register, verifyOtp, getUserById, login, logout };