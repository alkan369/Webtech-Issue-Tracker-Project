import { Router } from "express";
import { ProjectModel } from "../../database/models/project.model";
import { getAllProjects, getProjectByName, getProjectByStatus,
createProject, 
updateProject,
deleteProject,
getById} from "../../database/methods/project.methods";
import { validProjectPriorities, validProjectStatus } from "../../database/schemas/project.schema";
import { TicketModel } from "../../database/models/ticket.model";

const projectsController = Router();

projectsController.get('/', async (req, res) => {

    await getAllProjects(req, res);
});

projectsController.get('/:id', async (req, res) => {
    await getById(req, res);
});

projectsController.get('/view_by_name/:projectName', async (req, res) => {

    await getProjectByName(req, res);
});

projectsController.get('/view_by_status/:status', async (req, res) =>{
    const projectStatusIndex: number = validProjectStatus.indexOf(req.params.status);
    if(projectStatusIndex === -1){
        return res.status(400).json({'message': 'Invalid Project Status Input'});
    }

    await getProjectByStatus(req, res);
})

projectsController.post('/create', async (req, res) => {
    if (req.body.projectName) {
        const project = await ProjectModel.findOne({ projectName: req.body.projectName });
        if (project) {
            return res.status(400).json({ message: 'There Is A Project With Such Name' });
        }
    }

    if(req.body.status && validProjectStatus.indexOf(req.body.status) === -1){
        return res.status(400).json({ message: 'Invalid Project Status Entered' });
    }

    if(!req.body.priority){
        return res.status(400).json({ message: 'Project Priority Has Not Been Entered' });
    }
    
    if(validProjectPriorities.indexOf(req.body.priority) === -1){
        return res.status(400).json({ message: 'Project Ticket Priority Input' });
    }

    await createProject(req, res);
});

projectsController.put('/edit/:id', async (req, res) => {
    const projectToBeUpdated = await ProjectModel.findById({ _id: req.params.id });
    if (!projectToBeUpdated) {
        return res.status(400).json({ message: 'No Project' });
    }
    
    if (req.body.projectName) {
        const project = await ProjectModel.findOne({ projectName: req.body.projectName });
        if (project && project._id != req.body._id) {
            return res.status(400).json({ message: 'There Is A Project With Such Name' });
        }
    }

    if(req.body.status && validProjectStatus.indexOf(req.body.status) === -1){
        return res.status(400).json({ message: 'Invalid Project Status' });
    }

    if(req.body.status === 'Done' && projectToBeUpdated.status !== 'Done'){
        const currentProjectTickets = await TicketModel.find({ projectName: req.body.projectName });
        for(var ticket of currentProjectTickets){
            if(ticket.status !== 'Resolved'){
                return res.status(400).json({message: 'Project Has Incompleted Tickets'});
            }
        }
    }

    if (req.body.priority && validProjectPriorities.indexOf(req.body.priority) === -1) {
        return res.status(400).json({ message: 'Invalid Project Priority' });
    }

    await updateProject(req, res);
});

projectsController.delete('/delete/:projectName', async (req, res) => {
    
    await deleteProject(req, res);
});

export default projectsController;