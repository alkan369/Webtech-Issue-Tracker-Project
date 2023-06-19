import { Router } from "express";
import { validTicketStatus, validTicketPriorities } from "../../database/schemas/ticket.schema";
import  { TicketModel } from '../../database/models/ticket.model';
import { ProjectModel } from "../../database/models/project.model";
import { UserModel } from "../../database/models/user.model";
import { getTicketByStatus, getTicketByProjectName, getTicketByTitle, 
    getTicketByAssignee, createTicket, updateTicket, deleteTicket, 
    getAllTickets, getTicketWithNoProject, getTicketNotAsigned } from "../../database/methods/ticket.methods";

const ticketsController = Router();

ticketsController.get('/', async (req, res) => { // works
    await getAllTickets(req, res);
});

ticketsController.get('/view_by_title/:title', async (req, res) => { //works
    // const searchedTicketID: string = req.params.title;
    // if (!searchedTicketID || searchedTicketID.length === 0) {
    //     return res.status(400).json({ 'message': 'Empty Ticket Id' });
    // }
    // const ticketIndex: number = await tickets.findIndex(ticket => ticket.id === searchedTicketID);
    // if (ticketIndex === -1) {
    //     return res.status(400).json({ 'message': 'No Ticket With Such Id' });
    // }
    // return await res.status(200).json(tickets[ticketIndex]);
        
    await getTicketByTitle(req, res);
});

ticketsController.get('/view_by_project/:projectName', async (req, res) =>{ // works
    // const searchedProjectName: string = req.params.projectName;
    // if(!searchedProjectId || searchedProjectId.length === 0){
    //     return res.status(400).json({'message': 'No Ticket Asignee Input'});
    // }
    // const filteredTickets = await tickets.filter(tickets => tickets.projectId === searchedProjectId);
    // return res.status(200).json(filteredTickets);
    
    await getTicketByProjectName(req, res);
    
})

ticketsController.get('/view_by_project/', async (req, res) =>{ //works
    // const searchedProjectName: string = req.params.projectName;
    // if(!searchedProjectId || searchedProjectId.length === 0){
    //     return res.status(400).json({'message': 'No Ticket Asignee Input'});
    // }
    // const filteredTickets = await tickets.filter(tickets => tickets.projectId === searchedProjectId);
    // return res.status(200).json(filteredTickets);
    
    await getTicketWithNoProject(req, res);
    
})

ticketsController.get('/view_by_asignee/:assignedTo', async (req, res) =>{ // works
    // const searchedAsignedTo: string = req.params.assignedTo;
    // if(!searchedAsignedTo || searchedAsignedTo.length === 0){
    //     return res.status(400).json({'message': 'No Ticket Asignee Input'});
    // }    
    // const filteredTickets = await tickets.filter(tickets => tickets.assignedTo === searchedAsignedTo);
    // return res.status(200).json(filteredTickets);
    
    await getTicketByAssignee(req, res);
    
})

ticketsController.get('/view_by_asignee/', async (req, res) =>{ // works
    // const searchedAsignedTo: string = req.params.assignedTo;
    // if(!searchedAsignedTo || searchedAsignedTo.length === 0){
    //     return res.status(400).json({'message': 'No Ticket Asignee Input'});
    // }    
    // const filteredTickets = await tickets.filter(tickets => tickets.assignedTo === searchedAsignedTo);
    // return res.status(200).json(filteredTickets);
    
    await getTicketNotAsigned(req, res);
    
})

ticketsController.get('/view_by_status/:status', async (req, res) =>{ // works
    // const searchedStatus: string = req.params.status;
    // if(!searchedStatus || searchedStatus.length === 0){
    //     return res.status(400).json({'message': 'No Ticket Status Input'});
    // }
    // const filteredTickets = await tickets.filter(ticket => ticket.status === searchedStatus);
    // return res.status(200).json(filteredTickets);

    const ticketStatusIndex: number = validTicketStatus.indexOf(req.params.status);
    if(ticketStatusIndex === -1){
         return res.status(400).json({message: 'Invalid Ticket Status Input'});
    }

    // try{
    //     const ticket = await TicketModel.find({ status: req.params.status });
    //     return res.status(200).json(ticket);
    // } 
    // catch (error) {
    //     return res.status(404).json({ message: error });
    // }
    
    await getTicketByStatus(req, res);
})


ticketsController.post('/create', async (req, res) => { // works
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
    
    if (req.body.title) {
        const ticket = await TicketModel.findOne({ title: req.body.title });
        if (ticket) {
            return res.status(400).json({ message: 'Ticket With Such Title Already Exists' });
        }
    }
    
    if (req.body.projectName) {
        const project = await ProjectModel.findOne({ projectName: req.body.projectName});
        if (!project) {
            return res.status(400).json({ message: 'No Project With Such Name' });
        }
        if(project.status === 'Done'){
            return res.status(400).json({ message: 'Cannot Be Created Ticket To A Project With Status Done' });
        }
    }

    if (req.body.assignedTo) {
        const user = await UserModel.findOne({ username: req.body.assignedTo });
        if (!user) {
            return res.status(400).json({ message: 'No User With Such Username'})
        }
    }

    if(req.body.status && validTicketStatus.indexOf(req.body.status) === -1){
        return res.status(400).json({ message: 'Invalid Entered Ticket Status' });
    }

    if(!req.body.priority){
        return res.status(400).json({ message: 'Ticket Priority Has Not Been Entered' });
    }
    
    if(validTicketPriorities.indexOf(req.body.priority) === -1){
        return res.status(400).json({ message: 'Invalid Ticket Priority Input' });
    }

    // check the other DB and check if objects are present

    // const newTicket = new TicketModel({
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

    
    await createTicket(req, res);
    
});

ticketsController.put('/edit/:title', async (req, res) => { // works
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

    
    const ticketToBeUpdated = await TicketModel.findOne({ title: req.params.title });
    if (!ticketToBeUpdated) {
        return res.status(400).json({ message: 'No Ticket With Such Title' });
    }

    if (req.body.title) {
        const ticket = await TicketModel.findOne({ title: req.body.title });
        if (ticket) {
            return res.status(400).json({ message: 'Ticket With Such Title Already Exists' });
        }
    }
    
    // newpproject 
    // get all body data and param
    // and check if null and change data that is not null
    // check the new title if is not taken and projectID and etc.

    if(req.body.projectName){
        const searchedProjectName = await ProjectModel.findOne({ projectName: req.body.projectName });
        if(!searchedProjectName){
            return res.status(400).json({ message: 'No Such Project Name' });
        }
    }
    
    if(req.body.assignedTo){
        const searchedAssignedTo = await UserModel.findOne({ username: req.body.assignedTo });
        if(!searchedAssignedTo){
            return res.status(400).json({ message: 'No User With Such Username' });
        }
    }

    if(req.body.status && validTicketStatus.indexOf(req.body.status) === -1){
        return res.status(400).json({ message: 'Invalid Ticket Status' });
    }
    
    if(req.body.status === 'Open'){
        return res.status(400).json({ message: 'Ticket Has Already Been Open' });
    }

    if(req.body.status === 'Resolved' && ticketToBeUpdated.status === 'Open'){
        return res.status(400).json({message: 'Ticket Status Cannot Be Changed To Resolved From Open'});
    }

    // Open -> In progess // ok
    // Open -> resolved -> XXX
    // In progess -> resolved // <- OK
    // resolved -> OPEN -> NO
    // resolved -> In Progess -> OK
    
    // check if open(body)
    
    
    // not needed to check for in progress
    
    //resolved(body) -> ticket status cannot be open
    
    if (req.body.priority && validTicketPriorities.indexOf(req.body.priority) === -1) {
        return res.status(400).json({ message: 'Invalid Ticket Priority' });
    }

    // check if enums for status and priority are validated
    // try {
    //     const updateTicket = await TicketModel.findOneAndUpdate({ title: req.params.title },
    //         { $set: 
    //             { 
    //             title: req.body.title, projectName: req.body.projectName, assignedTo: req.body.assignedTo, 
    //             description: req.body.description, status: req.body.status, updateDate: new Date(), priority: req.body.priority
    //             }
    //         });
    //     return res.status(200).json(updateTicket);
    // } 
    // catch (error) {
    //     return res.status(400).json({ message: error });
    // }
 
    await updateTicket(req, res);
    
});

ticketsController.delete('/delete/:title', async (req, res) => { // works
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
        
    
    await deleteTicket(req, res);
    
});

export default ticketsController;