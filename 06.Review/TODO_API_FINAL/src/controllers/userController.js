import User from "../models/user.js";

async function getUsers(req, res) {
    const users = await User.find();

    if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ users });
}

async function getUser(req, res) {

    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
}

async function updateUser(req, res) {
    const { userId } = req.params;
    const { displayName, userName, email, role, phone, isActive } = req.body;

    const user = await User.findOne(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (email && email !== user.email) {
        const emailExists = await User.findOne({ email, _id: { $ne: userId } });
        if (emailExists) {
            return res.status(400).json({ message: "Email already in use" });
        }
    }

    if (displayName) user.displayName = displayName;
    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (isActive !== undefined) user.isActive = isActive;

    await user.save();

    const updatedUser = await User.findById(userId).select("-hashPassword");

    return res.status(200).json({
        message: "Profile updated succesfully",
        user: updatedUser
    });

}

async function deleteUser(req, res) {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json();
}

export { getUser, getUsers, deleteUser, updateUser };