import { Router } from "express";
import { Ticket, validTicketStatus, TicketRequest, validTicketPriorities } from "../../interfaces/ticket";
import mongoose from "mongoose";
import { UserModel } from "../../database/models/user.model";
import { genSaltSync, hashSync } from "bcrypt";
import { createUser, deleteUser, getAllUsers, getUserByEmail, getUserByFirstName, getUserByLastName, getUserByUsername, loginUser, updateUser } from "../../database/methods/user.methods";
// import { tickets } from "../pseudoDB";

const usersController = Router();

usersController.get('/', async (req, res) => {
    await getAllUsers(req, res);
});

usersController.get('/view_by_username/:username', async (req, res) => {
    // const searchedTicketID: string = req.params.title;
    // if (!searchedTicketID || searchedTicketID.length === 0) {
    //     return res.status(400).json({ 'message': 'Empty Ticket Id' });
    // }
    // const ticketIndex: number = await tickets.findIndex(ticket => ticket.id === searchedTicketID);
    // if (ticketIndex === -1) {
    //     return res.status(400).json({ 'message': 'No Ticket With Such Id' });
    // }
    // return await res.status(200).json(tickets[ticketIndex]);
        
   await getUserByUsername(req, res);
});

usersController.get('/view_by_firstName/:firstName', async (req, res) =>{
    // const searchedProjectName: string = req.params.projectName;
    // if(!searchedProjectId || searchedProjectId.length === 0){
    //     return res.status(400).json({'message': 'No Ticket Asignee Input'});
    // }
    // const filteredTickets = await tickets.filter(tickets => tickets.projectId === searchedProjectId);
    // return res.status(200).json(filteredTickets);
    await getUserByFirstName(req, res);
})

usersController.get('/view_by_lastName/:lastName', async (req, res) =>{
    // const searchedAsignedTo: string = req.params.assignedTo;
    // if(!searchedAsignedTo || searchedAsignedTo.length === 0){
    //     return res.status(400).json({'message': 'No Ticket Asignee Input'});
    // }    
    // const filteredTickets = await tickets.filter(tickets => tickets.assignedTo === searchedAsignedTo);
    // return res.status(200).json(filteredTickets);
    await getUserByLastName(req, res);
})

usersController.get('/view_by_email/:email', async (req, res) =>{
    // const searchedStatus: string = req.params.status;
    // if(!searchedStatus || searchedStatus.length === 0){
    //     return res.status(400).json({'message': 'No Ticket Status Input'});
    // }
    // const ticketStatusIndex: number = validTicketStatus.indexOf(searchedStatus);
    // if(ticketStatusIndex === -1){
    //     return res.status(400).json({'message': 'Invalid Ticket Status Input'});
    // }
    // const filteredTickets = await tickets.filter(ticket => ticket.status === searchedStatus);
    // return res.status(200).json(filteredTickets);
    await getUserByEmail(req, res);
})


usersController.post('/create', async (req, res) => {
    // const newTicketId: string = String(tickets.length + 1);
    // const newTicketTitle: string = req.body.title;
    // const newTicketProjectId: string = req.body.projectId ? req.body.projectId : '';    // is it ok not to have project ID
    // const newTicketAssignedTo: string = req.body.assignedTo ? req.body.assignedTo : '';  // is it ok not to have assigned to ID
    // const newTicketDescription: string = req.body.description ? req.body.description : '';
    // const newTicketCreateDate: Date = new Date();
    // const newTicketUpdateDate: Date = new Date();
    // const newTicketPriority: string = req.body.priority ? req.body.priority : '';
    // if (newTicketTitle.length === 0) {
    //     return res.status(400).json({ 'message': 'No Ticket Title Set' });
    // }
    // if (newTicketPriority.length === 0) {
    //     return res.status(400).json({ 'message': 'No Ticket Priority Set' });
    // }

    // if (validPriorities.indexOf(newTicketPriority) === -1) {
    //     return res.status(400).json({ 'message': 'Invalid Ticket Priority' });
    // }
    // const newTicketStatus: string = 'open';

    // const createdTicket: Ticket = {
    //     id: newTicketId,
    //     title: newTicketTitle,
    //     projectId: newTicketProjectId,
    //     assignedTo: newTicketAssignedTo,
    //     description: newTicketDescription,
    //     createDate: newTicketCreateDate,
    //     updateDate: newTicketUpdateDate,
    //     status: newTicketStatus,
    //     priority: newTicketPriority
    // };
    // try {
    //     await tickets.push(createdTicket)
    //     return res.status(201).json(createdTicket);
    // }
    // catch (error) {
    //     return res.status(500).json({
    //         'message': 'Ticket Cannot Be Created',
    //         'error': error
    //     })
    // }

    // check title
    // const projectName: string = req.body.projectName;
    // const assignedTo: string = req.body.assignedTo;

    // check the other DB and check if objects are present

    // const newTicket = new UserModel({
    //     id: new mongoose.Types.ObjectId,
    //     title: req.body.title,
    //     projectName: projectName,
    //     assignedTo: assignedTo,
    //     description: req.body.description,
    //     status: req.body.status,
    //     priority: req.body.priority
    // });

    // const validationError = newTicket.validateSync();
    // if (validationError) {
    //     return res.status(400).json(validationError);
    // }

    // try {
    //     await newTicket.save();
    //     return res.status(201).json(newTicket);
    // }
    // catch (error) {
    //     return res.status(500).json({ message: error });
    // }

    if(!req.body.firstName || req.body.firstName === ""){
        return res.status(400).json({ message: 'Enter your first name.' });
    }

    if(!req.body.lastName || req.body.lastName === ""){
        return res.status(400).json({ message: 'Enter your last name.' });
    }

    if(!req.body.username || req.body.username === ""){
        return res.status(400).json({ message: 'Enter a username.' });
    }

    if(!req.body.email || req.body.email === ""){
        return res.status(400).json({ message: 'Enter an e-mail.' });
    }

    if(!req.body.password || req.body.password === ""){
        return res.status(400).json({ message: 'Enter a password.' });
    }

    if(req.body.password !== req.body.confirmPassword){
        return res.status(400).json({ message: 'Passwords don\'t match.' });
    }
    
    const userWithSuchUsername = await UserModel.findOne({ username: req.body.username });
    if (userWithSuchUsername) {
        return res.status(400).json({ message: 'Username already taken.' });
    }
    
    const userWithSuchEmail = await UserModel.findOne({ email: req.body.email });
    if (userWithSuchEmail) {
        //   const x = res.status(400).json({ message: 'User With Such Email Already Exists' });
        // //   console.log("LINE 142 : ");
        // //   console.log());
        // //   console.log("\nafter header\n");
        return res.status(400).json({ message: 'E-mail already registered.' });
    }

    if(req.body.password.length < 8){
        return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    // const newUser = new UserModel({
    //     id: new mongoose.Types.ObjectId(),
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     email: req.body.email,
    //     password: hashSync(req.body.password, genSaltSync()),
    //     username: req.body.username,
    // });

    // const validationError = newUser.validateSync();
    // if (validationError) {
    //     return res.status(400).json(validationError);
    // }

    // try {
    //     await newUser.save();
    //     return res.status(201).json(newUser);
    // } catch (error) {
    //     return res.status(500).json({ message: error });
    // }
    await createUser(req, res);

});

usersController.post('/login', async (req, res) =>{
    const username = req.body.loginUsername;
    if(!username || username === ''){
        return res.status(400).json({ message: 'Enter a username.'});
    }

    const password = req.body.loginPassword;
    if(!password || password === ''){
        return res.status(400).json({ message: 'Enter a password.'});
    }

    await loginUser(req, res);
});

usersController.put('/edit/:username', async (req, res) => {
    // const ticketID = req.params.id;
    // if(!ticketID || ticketID.length === 0){
    //     return res.status(400).json({'message': 'No Entered Ticket Id'});
    // }
    // const searchedTicketIndex = tickets.findIndex(ticket => ticket.id === ticketID);
    // if(searchedTicketIndex === -1){
    //     return res.status(400).json({'message': 'No Ticket Found With Such Id'});
    // }
    // const ticketToBeEdited: Ticket = await tickets[searchedTicketIndex];
    // const newTitle: string = req.body.title;
    // const newProjectId: string = req.body.projectId;
    // const newAssignedTo: string = req.body.assignedTo;
    // const newDescription: string = req.body.description;
    // const newStatus: string = req.body.status;
    // const newPriority: string = req.body.priority;
    // if(newTitle){
    //     if(newTitle.length === 0){
    //         return res.status(400).json({'message': 'Ticket Title Cannot Be Empty Title'});
    //     }
    //     ticketToBeEdited.title = newTitle;
    // }
    // if(newProjectId){
    //     ticketToBeEdited.projectId = newProjectId;
    // }
    // if(newAssignedTo){
    //     ticketToBeEdited.assignedTo = newAssignedTo;
    // }
    // if(newDescription){
    //     ticketToBeEdited.description = newDescription;
    // }
    // if(newStatus && newStatus.length !== 0){

    //     if(await validTicketStatus.indexOf(newStatus) === -1){
    //         return res.status(400).json({'message' : 'Invalid Ticket Status Input'});
    //     }
    //     ticketToBeEdited.status = newStatus;
    // }
    // if(newPriority && newPriority.length !== 0){

    //     if(await validPriorities.indexOf(newPriority) === -1){
    //         return res.status(400).json({'message' : 'Invalid Ticket Priority Input'});
    //     }
    // }
    // ticketToBeEdited.updateDate = new Date();
    // tickets[searchedTicketIndex] = ticketToBeEdited;
    // return res.status(200).json(ticketToBeEdited);

    
    const userToBeUpdated = await UserModel.findOne({ username: req.params.username });
    if (!userToBeUpdated) {
        return res.status(400).json({ message: 'No User With Such Username' });
    }
    
    // newpproject 
    // get all body data and param
    // and check if null and change data that is not null
    // check the new title if is not taken and projectID and etc.

    if(req.body.email){
        const searchedEmail = await UserModel.findOne({ email: req.body.email });
        if(searchedEmail){
            return res.status(400).json({ message: 'User With Such Email Already Exists' });
        }
    }
    
    if(req.body.username){
        const searchedUsername = await UserModel.findOne({ username: req.body.username });
        if(searchedUsername){
            return res.status(400).json({ message: 'User With Such Username Already Exists' });
        }
    }
    
    if(req.body.password && req.body.password.length < 8){
        return res.status(400).json({ message: 'Password Must Be Atleast 8 Characters Long' });
    }

    // check if enums for status and priority are validated
    // try {
    //     const updateUser = await UserModel.findOneAndUpdate({ username: req.params.username },
    //         { $set: 
    //             { 
    //             fistName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, 
    //             password: hashSync(req.body.password, genSaltSync()),
    //             username: req.body.username, updateDate: new Date()
    //             }
    //         });
    //     return res.status(200).json(updateUser);
    // } 
    // catch (error) {
    //     return res.status(500).json({ message: error });
    // }
    await updateUser(req, res);
});

usersController.delete('/delete/:username', async (req, res) => {
    // const searchedTicketId: string = req.params.id;
    // if(!searchedTicketId || searchedTicketId.length === 0){
    //     return res.status(400).json({'message': 'No Ticket Id Input'});
    // }
    // const searchedTicket: number = await tickets.findIndex(ticket => ticket.id === searchedTicketId);
    // if (searchedTicket === -1) {
    //     return res.status(400).json({ 'message': 'Ticket With Such Id Is Not Found' });
    // }
    // else {
        //     const removedTicket = await tickets[searchedTicket];
        //     try {
            //         await tickets.splice(searchedTicket, 1);
            //         return res.status(200).json(removedTicket);
            //     }
    //     catch (error) {
    //         return res.status(500).json
    //             ({
        //                 'message': 'Error Ocurred In Deleting The Ticket',
        //                 error
        //             });
        //     }
        // }
        
    // try {
    //     const deletedUser = await UserModel.findOneAndDelete({ username: req.params.username });

    //     if (!deletedUser) {
    //         return res.status(400).json({ 'message': 'No User With Such Username' });
    //     }
    //     return res.status(200).json(deletedUser);
    // }
    // catch (error) {
    //     return res.status(500).json({ message: error });
    // }

    await deleteUser(req, res);
});

export default usersController;