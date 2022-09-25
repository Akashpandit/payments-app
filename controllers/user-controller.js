import Client from "../model/Client.js";
import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
    const { name, email, contact, password, description } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }

    if (existingUser) {
        return res
            .status(400)
            .json({
                message: "User is already added.Login to view."
            })
    }

    const hashPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        contact,
        email,
        password: hashPassword,

        description,
        clients: []
    });

    try {
        user.save();
    } catch (err) {
        return console.error(err);
    }

    return res.status(201).json({ user });


}

export const login = async (req, res, next) => {

    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }

    if (!existingUser) {
        return res.status(400).json({
            message: "No User found!"
        });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Invalid credential"
        });
    }

    return res.status(200).json({ message: "Login Successful", user: existingUser });
};


export const getAllUsers = async (req, res, next) => {

    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }

    if (!users) {
        return res.status(404).json({
            message: "No users found"
        });
    }

    return res.status(200).json({ users });

}