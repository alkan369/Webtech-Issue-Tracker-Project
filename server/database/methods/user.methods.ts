import express from "express";
import { UserModel } from "../models/user.model";
import mongoose from "mongoose";
import { genSaltSync, hashSync, compare } from "bcrypt";

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
        username: req.body.username,
        email: req.body.email,
        password: hashSync(req.body.password, genSaltSync()),
    });
    
    const validationError = newUser.validateSync();
    if (validationError) {
        res.status(400).json(validationError);
        return;
    }

    try {
        await newUser.save();
<<<<<<< HEAD
        const token = tokenGenerator(req.body.username);
        res.status(201).json({ 'token': token });
=======
        res.status(201).json(newUser);
>>>>>>> 29caadf9fb62987cd6891a6dc72b3386930528fe
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function loginUser(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try{
        const searchedUser = await UserModel.findOne({ username: req.body.loginUsername })

        if(!searchedUser || !await compare(req.body.loginPassword, searchedUser.password)){
            res.status(400).json({ message: 'Invalid Username Or Password'});
            return;
        }

<<<<<<< HEAD
        const token = tokenGenerator(searchedUser.username);
        res.status(200).json({ 'token': token });
=======
        // console.log("After Find One");
        // if(!searchedUser){
        //     res.status(400).json({ message: 'Invalid Username Or Password'});
        //     return;
        // }
        // console.log("Before Status 200");
        res.status(200).json({ message: `Welcome back ${searchedUser.username}!`});
        // console.log("After Status 200");
>>>>>>> 29caadf9fb62987cd6891a6dc72b3386930528fe
    }
    catch(error){
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
                fistName: req.body.firstName, lastName: req.body.lastName,
                username: req.body.username, email: req.body.email, 
                password: hashSync(req.body.password, genSaltSync()),
                updateDate: new Date()
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
