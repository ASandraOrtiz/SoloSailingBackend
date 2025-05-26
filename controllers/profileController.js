const Profile = require('../models/Profile');
exports.getProfile = async (req, res) => {
    let p = await Profile.findOne({ user: req.user._id });
    if (!p) p = await Profile.create({ user: req.user._id });
    res.json(p);
};

exports.updateProfile = async (req, res) => {
    const p = await Profile.findOneAndUpdate(
        { user: req.user._id },
        req.body,
        { new: true}
    );
    res.json(p);
};
