const User = require('../Models/userModel');
const ImageKit = require('imagekit');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const otpGenerator = require('otp-generator');
const { sendOtp, sendSuccess } = require('../Mailers/mailer.js');
dotenv.config();

// ImageKit.io configuration
const imagekit = new ImageKit({
    publicKey: process.env.PUB_KEY,
    privateKey: process.env.PRIV_KEY,
    urlEndpoint: 'https://ik.imagekit.io/ohyajk',
});

// REGISTER

const register = async (req, res) => {
    const { name, username, email, password, gender, image } = req.body;

    try {
        const otp = otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        // const imageUpload = await imagekit.upload({
        //     file: image,
        //     fileName: `${username}_dp`,
        // });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            name,
            username,
            email,
            password: hashedPassword,
            gender,
            profilePicture: '',
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
            return res.status(200).json({ user });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { register, verifyOtp, getUserById };