const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        lowercase: true,
    },
    username: {
        type: String,
        required: [true, 'Please enter your username'],
        unique: [true, 'Username already exists'],
        minlength: [4, 'Username must be at least 4 characters long'],
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: [true, 'Email already exists'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: [true, 'Please select your gender'],
    },
    profilePicture: {
        type: String,
        default: '',
    },
    isVerified: {
        type: Boolean,
        default: [false, 'Please verify your Account'],
    },
    otp: {
        type: Number,
    }
}, {
    timestamps: true,
}
);

// Middleware to make the fields lowercase before saving !
UserSchema.pre('save', function (next) {
    this.name = this.name.toLowerCase();
    this.username = this.username.toLowerCase();
    this.email = this.email.toLowerCase();
    this.gender = this.gender.toLowerCase();
    if (this.profilePicture === '') {
        if (this.gender === 'male') {
            this.profilePicture = 'https://ik.imagekit.io/ohyajk/male.png';
        } else if (this.gender === 'female') {
            this.profilePicture = 'https://ik.imagekit.io/ohyajk/female.png';
        }
    }
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;