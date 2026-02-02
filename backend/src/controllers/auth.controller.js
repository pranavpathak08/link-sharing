import { sendPasswordResetEmail } from "../config/email.config.js";
import { ERROR_MESSAGES } from "../constants/index.js";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import crypto from 'crypto'

//Register

export const register = async (req, res) => {
    
    const {email, username, password, firstName, lastName} = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ $or: [{email}, {username}]});

    if (existingUser)
        return res.status(400).json({message: "User already exists"});

    const user = await User.create({
        email,
        username,
        password,
        firstName,
        lastName
    });

    res.status(201).json({
        message: "User registered successfully",
        token: generateToken(user)
    })

    console.log("New user registered: ", user);
}

//Login

export const login = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email, active: true});
    if(!user || !(await user.comparePassword(password)))
        return res.status(401).json({message: "Invalid Credentials"});

    res.json({
        message: "Login Successful",
        token: generateToken(user)
    })

    console.log(`${user.firstName} ${user.lastName} logged in!`)
}


// Forgot Password

export const forgotPassword = async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email, active:true});

        if (!user)
            return res.status(404).json({message: "User not found"});

        const resetToken = user.createPasswordResetToken();
        await user.save();

        try {
            await sendPasswordResetEmail(user.email, resetToken);
            console.log(`Password reset email sent to: ${user.email}`);
            res.json({message: "Password reset link sent to mail"});
        } catch (emailError) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            
            console.error('Email sending failed:', emailError);
            return res.status(500).json({
                message: "Error sending email. Please try again later."
            });
        }
    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({message: "An error occurred. Please try again."});
    }
}


// Reset Password

export const resetPassword = async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    console.log(req.body);

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: {$gt: Date.now()}
    });

    if (!user)
        return res.status(400).json({message: "Invalid or expired token"})

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({message: "Password reset successful"});
};

//Deactivating account
export const deactivateAccount = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
        }

        user.active = false;
        await user.save();

        res.json({ message: "Account deactivated successfully" });
        console.log(`User ${ user.email } deactivated their account`);

    } catch (error) {
        console.error("Deactivate account error: ", error);
        res.status(500).json({ message: "Failed to deactivate account", error: error.message });
    }
}

//Reactivating user account
export const reactivateAccount = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, active: false });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        user.active = true;
        await user.save();
    } catch (error) {
        console.error("Error in account reactivation: ", error);
        res.status(500).json({message: "Failed to reactivate account", error: error.message})
    }
}