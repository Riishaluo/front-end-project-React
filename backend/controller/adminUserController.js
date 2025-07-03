const User = require('../model/userSchema');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

exports.toggleBlockUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBlocked = !user.isBlocked;
    await user.save();

    return res.status(200).json({ message: "User status updated", isBlocked: user.isBlocked });
  } catch (err) {
    return res.status(500).json({ message: "Error updating user status", error: err.message });
  }
};
