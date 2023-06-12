import express from "express";
import { UserModel } from "../models/user.model";
import mongoose from "mongoose";
import { genSaltSync, hashSync } from "bcrypt";

export async function getAllUsers(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function getUserByUsername(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try{
        const user = await UserModel.find({ username: req.params.username });
        res.status(200).json(user);
    } 
    catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function getUserByFirstName(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try{
        const user = await UserModel.find({ firstName: req.params.firstName });
        res.status(200).json(user);
    } 
    catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function getUserByLastName(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try{
        const user = await UserModel.find({ lastName: req.params.lastName });
        res.status(200).json(user);
    } 
    catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function getUserByEmail(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try{
        const user = await UserModel.find({ email: req.params.email });
        res.status(200).json(user);
    } 
    catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function createUser(
    req: express.Request,
    res: express.Response
): Promise<void> {
    const newUser = new UserModel({
        id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashSync(req.body.password, genSaltSync()),
        username: req.body.username,
    });

    const validationError = newUser.validateSync();
    if (validationError) {
        res.status(400).json(validationError);
        return;
    }

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function updateUser(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try {
        const updateUser = await UserModel.findOneAndUpdate({ username: req.params.username },
            { $set: 
                { 
                fistName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, 
                password: hashSync(req.body.password, genSaltSync()),
                username: req.body.username, updateDate: new Date()
                }
            });
        res.status(200).json(updateUser);
    } 
    catch (error) {
        res.status(500).json({ message: error });
    }

}

export async function deleteUser(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try {
        const deletedUser = await UserModel.findOneAndDelete({ username: req.params.username });

        if (!deletedUser) {
            res.status(400).json({ 'message': 'No User With Such Username' });
            return;
        }
        res.status(200).json(deletedUser);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }

}
