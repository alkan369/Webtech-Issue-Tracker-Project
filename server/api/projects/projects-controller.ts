import { Router } from "express";
import { Ticket, validTicketStatus, TicketRequest, validTicketPriorities } from "../../interfaces/ticket";
import mongoose from "mongoose";
import { ProjectModel } from "../../database/models/project.model";
import { UserModel } from "../../database/models/user.model";
// import { tickets } from "../pseudoDB";

const projectsController = Router();

projectsController.get('/', async (req, res) => {
    try {
        const tickets = await ProjectModel.find();
        return res.status(200).json(tickets);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

projectsController.get('/view_by_name/:projectName', async (req, res) => {
    // const searchedTicketID: string = req.params.title;
    // if (!searchedTicketID || searchedTicketID.length === 0) {
    //     return res.status(400).json({ 'message': 'Empty Ticket Id' });
    // }
    // const ticketIndex: number = await tickets.findIndex(ticket => ticket.id === searchedTicketID);
    // if (ticketIndex === -1) {
    //     return res.status(400).json({ 'message': 'No Ticket With Such Id' });
    // }
    // return await res.status(200).json(tickets[ticketIndex]);
        
    try{
        const ticket = await ProjectModel.find({ projectName: req.params.projectName });
        return res.status(200).json(ticket);
    } 
    catch (error) {
        return res.status(404).json({ message: error });
    }
});

projectsController.get('/view_by_status/:status', async (req, res) =>{
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

    const ticketStatusIndex: number = validTicketStatus.indexOf(req.params.status);
    if(ticketStatusIndex === -1){
        return res.status(400).json({'message': 'Invalid Ticket Status Input'});
    }
    try{
        const ticket = await ProjectModel.find({ status: req.params.status });
        return res.status(200).json(ticket);
    } 
    catch (error) {
        return res.status(404).json({ message: error });
    }
})


projectsController.post('/create', async (req, res) => {
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

    // check the other DB and check if objects are present

    const newProject = new ProjectModel({
        id: new mongoose.Types.ObjectId,
        projectName: req.body.projectName,
        description: req.body.description,
        status: req.body.status,
    });

    const validationError = newProject.validateSync();
    if (validationError) {
        return res.status(400).json(validationError);
    }

    try {
        await newProject.save();
        return res.status(201).json(newProject);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});

projectsController.put('/edit/:projectName', async (req, res) => {
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
    // tickets[searchedTicketIndex] = ticket
    if(req.body.priority && validTicketPriorities.indexOf(req.body.priority) === -1){
        return res.status(400).json({message : 'Invalid Ticket Priority'});
    }

    
    const projectToBeUpdated = await ProjectModel.findOne({ projectName: req.params.projectName });
    if (!projectToBeUpdated) {
        return res.status(404).json({ message: 'No Project With Such Name' });
    }
    
    // newpproject 
    // get all body data and param
    // and check if null and change data that is not null
    // check the new title if is not taken and projectID and etc.

    if(req.body.status && validTicketStatus.indexOf(req.body.status) === -1){
        return res.status(400).json({message : 'Invalid Ticket Status'});
    }

    // check if enums for status and priority are validated
    try {
        const upradeProject = await ProjectModel.findOneAndUpdate({ projectName: req.params.projectName },
            { $set: 
                { 
                projectName: req.body.projectName, updateDate: new Date(),
                description: req.body.description, status: req.body.status
                }
            });
        return res.status(200).json(upradeProject);
    } 
    catch (error) {
        return res.status(400).json({ message: error });
    }

});

projectsController.delete('/delete/:projectName', async (req, res) => {
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
        
    try {
        const projectToBeDeleted = await ProjectModel.findOneAndDelete({ title: req.params.projectName });
        // if (projectToBeDeleted) {
        //     return res.status(400).json({ 'message': 'No Ticket Id Input' });
        // }

        return res.status(200).json(projectToBeDeleted);
    }
    catch (error) {
        return res.status(404).json({ message: error });
    }
});

export default projectsController;