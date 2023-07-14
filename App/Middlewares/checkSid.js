const checkSid = async (req, res, next) => {
    if (req.session.user) next()
    else res.status(401).json({ message: 'Please login first' });
};

module.exports = checkSid;
