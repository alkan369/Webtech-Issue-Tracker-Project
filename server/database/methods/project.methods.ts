import express from "express";
import { ProjectModel } from "../models/project.model";
import mongoose from "mongoose";
import { TicketModel } from "../models/ticket.model";


export async function getAllProjects(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try {
        const tickets = await ProjectModel.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function getById(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try {
        const project = await ProjectModel.findById({_id: req.params.id});
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function getProjectByName(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try{
        const ticket = await ProjectModel.find({ projectName: req.params.projectName });
        res.status(200).json(ticket);
    } 
    catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function getProjectByStatus(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try{
        const ticket = await ProjectModel.find({ status: req.params.status });
        res.status(200).json(ticket);
    } 
    catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function createProject(
    req: express.Request,
    res: express.Response
): Promise<void> {
    const newProject = new ProjectModel({
        id: new mongoose.Types.ObjectId,
        projectName: req.body.projectName,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status
    });

    const validationError = newProject.validateSync();
    if (validationError) {
        res.status(400).json(validationError);
        return;
    }

    try {
        await newProject.save();
        res.status(201).json(newProject);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function updateProject(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try {
        const updateProject = await ProjectModel.findByIdAndUpdate({ _id: req.params.id },
            { $set: 
                { 
                projectName: req.body.projectName, updateDate: new Date(),
                description: req.body.description, status: req.body.status,
                priority: req.body.priority
                }
            });
        res.status(200).json(updateProject);
    } 
    catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function deleteProject(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try {
        const tickets = await TicketModel.find({ projectName: req.params.projectName });
        if(tickets.length !== 0){
            res.status(400).json({ message: 'The Project Has Tickets Attached To It' });
            return;
        }
        const projectToBeDeleted = await ProjectModel.findOneAndDelete({ projectName: req.params.projectName });
        
        if (!projectToBeDeleted) {
            res.status(400).json({ message: 'No Project With Such ProjectName' });
            return;
        }

        res.status(200).json({ message: "Done!" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}