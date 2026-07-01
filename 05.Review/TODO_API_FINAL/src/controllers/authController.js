import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function generateToken(userId, displayName, role) {
    return jwt.sign({ userId, displayName, role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )
}

async function generatePassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

async function checkUserExists(email) {
    const user = await User.findOne({ email });
    return user;
}

async function register(req, res) {
    try {
        const { displayName, userName, email, password, phone, role, isActive } = req.body;
        const userExists = await checkUserExists(email);
        if (userExists) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        const hashPassword = await generatePassword(password);

        const newUser = new User({
            displayName,
            userName,
            email,
            hashPassword,
            role,
            phone,
            isActive
        });

        await newUser.save();
        res.status(201).json({
            displayName,
            userName,
            email,
            hashPassword,
            role,
            phone,
            isActive
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Couldn't Create User" });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const userExists = await checkUserExists(email);
        if (!userExists) {
            return res.status(400).json({ message: "User does not exists. You must sign in" });
        }

        const isMatch = await bcrypt.compare(password, userExists.hashPassword);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = generateToken(userExists._id, userExists.displayName, userExists.role);
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Couldn't Login, Unexpected Error" });
    }
}

export { register, login }