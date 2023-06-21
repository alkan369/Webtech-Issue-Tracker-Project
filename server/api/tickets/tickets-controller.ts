import { Router } from "express";
import { validTicketStatus, validTicketPriorities } from "../../database/schemas/ticket.schema";
import  { TicketModel } from '../../database/models/ticket.model';
import { ProjectModel } from "../../database/models/project.model";
import { UserModel } from "../../database/models/user.model";
import { getTicketByStatus, getTicketByProjectName, getTicketByTitle, 
    getTicketByAssignee, createTicket, updateTicket, deleteTicket, 
    getAllTickets, getTicketWithNoProject, getTicketNotAsigned, getById } from "../../database/methods/ticket.methods";

const ticketsController = Router();

ticketsController.get('/', async (req, res) => { 
    await getAllTickets(req, res);
});

ticketsController.get('/:id', async (req, res) => {
    await getById(req, res);
})

ticketsController.get('/view_by_title/:title', async (req, res) => {
        
    await getTicketByTitle(req, res);
});

ticketsController.get('/view_by_project/:projectName', async (req, res) =>{ 
    
    await getTicketByProjectName(req, res);
})

ticketsController.get('/view_by_project/', async (req, res) =>{

    await getTicketWithNoProject(req, res);
})

ticketsController.get('/view_by_asignee/:assignedTo', async (req, res) =>{ 
    
    await getTicketByAssignee(req, res);
})

ticketsController.get('/view_by_asignee/', async (req, res) =>{ 
    
    await getTicketNotAsigned(req, res);
})

ticketsController.get('/view_by_status/:status', async (req, res) =>{ 

    const ticketStatusIndex: number = validTicketStatus.indexOf(req.params.status);
    if(ticketStatusIndex === -1){
         return res.status(400).json({message: 'Invalid Ticket Status Input'});
    }

    await getTicketByStatus(req, res);
})

ticketsController.post('/create', async (req, res) => { 

    if (req.body.title) {
        const ticket = await TicketModel.findOne({ title: req.body.title });
        if (ticket) {
            return res.status(400).json({ message: 'Ticket With Such Title Already Exists' });
        }
    }
    
    if (req.body.projectName) {
        const project = await ProjectModel.findOne({ projectName: req.body.projectName });
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
    
    await createTicket(req, res);    
});

ticketsController.put('/edit/:id', async (req, res) => { 
    
    const ticketToBeUpdated = await TicketModel.findById({ _id: req.params.id });
    if (!ticketToBeUpdated) {
        return res.status(400).json({ message: 'No Ticket' });
    }

    if (req.body.title) {
        const ticket = await TicketModel.findOne({ title: req.body.title });
        if (ticket && ticket._id != req.body._id) {
            return res.status(400).json({ message: 'Ticket With Such Title Already Exists' });
        }
    }

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

    if (req.body.priority && validTicketPriorities.indexOf(req.body.priority) === -1) {
        return res.status(400).json({ message: 'Invalid Ticket Priority' });
    }

    await updateTicket(req, res);
});

ticketsController.delete('/delete/:title', async (req, res) => { 
    
    await deleteTicket(req, res);
});

export default ticketsController;