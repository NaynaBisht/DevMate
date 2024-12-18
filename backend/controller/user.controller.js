import {User} from '../models/user.model.js';
import bycrpt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// register logic
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message: "Please fill in all fields.",
                success: false
            });
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: "This email already exists.",
                success: false
            });
        }
        const hashedPassword = await bycrpt.hash(password, 10);
        
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        })
        return res.status(201).json({
            message: "User registered successfully.",
            success: true
        })
    }
    catch(error){
        console.log(error);
    }
}

// login logic
export const login = async (req, res) => {
    try{
        const { email, password, role } = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: "Please fill in all fields.",
                success: false
            });
        }
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message : "Incorrect email or password.",
                success: false
            })
        }

        const isPasswordMatch = await bycrpt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message : "Incorrect email or password.",
                success: false
            })
        }

        if(user.role !== role){
            return res.status(400).json({
                message : "Unauthorized.",
                success: false
            })
        }

        const tokenData = {
            userId: user._id,
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: "1d"});

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict'
        }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })

    }
    catch(error){
        console.log(error);
    }
}

// logout
export const logout = async (req, res) => {
    try{
        return res.status(200).cookie("token", " ", {maxAge:0}).json({
            message: "Logged out successfully.",
            success: true
        })
    }
    catch(error){
        console.log(error);
    }
}

// update profile
export const updateProfile = async (req, res) => {
    try{
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        const file = req.file;
        // if(!fullname || !email || !phoneNumber || !bio || !skills){
        //     return res.status(400).json({
        //         message: "Please fill in all fields.",
        //         success: false
        //     });
        // }

        let skillsArray = [];
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; // from middleware

        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        // update data
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray;

        // resume comes later here....

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true            
        })
    }
    catch(error){
        console.log(error);
    }
}