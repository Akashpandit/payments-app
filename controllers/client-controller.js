

import mongoose from "mongoose";
import Payment from "../model/Payment.js";
import Client from "../model/Client.js"
import User from "../model/User.js"

export const addClient = async (req, res, next) => {
    const { name, email, contact, area, description, user } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        return console.log(err)
    }
    if (!existingUser) {
        return res.status(400).json({
            message: "User not found"
        });
    }

    const client = new Client({
        name,
        email,
        contact,
        area,
        description,
        payments: [],
        totalSent: 0,
        totalReceived: 0,
        user
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await client.save({ session });
        existingUser.clients.push(client);
        await existingUser.save({ session });
        await session.commitTransaction();
    } catch (err) {
        return console.log(err);
    }

    return res.status(200).json({ client });

}

export const getAllClients = async (req, res, next) => {
    let clients;
    try {
        clients = await Client.find().populate("user");
    } catch (err) {
        return console.log(err);
    }

    if (!clients) {
        return res.status(404).json({ message: "No clients found" });
    }

    return res.status(200).json({ clients });
}


//Editing payment

export const editClient = async (req, res, next) => {
    const { name, email, contact, area, description } = req.body;

    const clientId = req.params.id; //getting the payment id from url
    let client;
    try {
        client = await Client.findByIdAndUpdate(clientId, { name, email, contact, area, description });
    } catch (err) {
        return console.log(err)
    }
    if (!client) {
        return res.status(500).json({ message: "Failed to update" });
    }

    return res.status(200).json({ client });

}

export const getClientById = async (req, res, next) => {

    const clientId = req.params.id;
    let client;

    try {
        client = await Client.findById(clientId);
    } catch (err) {
        return console.log(err);
    }
    if (!client) {
        return res.status(400).json({
            message: "No client found"
        });
    }
    res.status(200).json({ client });
}



export const deleteClientById = async (req, res, next) => {
    const clientId = req.params.id;
    let client;
    try {
        client = await Client.findByIdAndRemove(clientId);
    } catch (err) {
        console.log(err);
    }

    if (!client) {
        return res.status(500).json({ message: "Failed to delete the client" });
    }

    return res.status(200).json({ message: "Successfully Deleted" });

}

export const userClients = async (req, res, next) => {

    const userId = req.params.id;

    let userClients;

    try {
        userClients = await User.findById(userId).populate("clients");
    } catch (err) {
        return console.log(err);
    }

    if (!userClients) {
        return res.status(404).json({ message: "No Clients Found" });
    }

    return res.status(200).json({ user: userClients });
}

////
