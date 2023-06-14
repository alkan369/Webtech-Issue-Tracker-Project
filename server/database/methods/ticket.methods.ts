import express from "express";
import { TicketModel } from "../models/ticket.model";
import mongoose from "mongoose";


export async function getAllTickets(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try {
        const tickets = await TicketModel.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function getTicketByStatus(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try {
        const ticket = await TicketModel.find({ status: req.params.status });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function getTicketByTitle(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try {
        const ticket = await TicketModel.find({ title: req.params.title });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function getTicketByProjectName(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try {
        const ticket = await TicketModel.find({ projectName: req.params.projectName });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function getTicketWithNoProject(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try {
        const ticket = await TicketModel.find({ projectName: "" });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function getTicketByAssignee(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try{
        const ticket = await TicketModel.find({ assignedTo: req.params.assignedTo });
        res.status(200).json(ticket);
    } 
    catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function getTicketNotAsigned(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try{
        const ticket = await TicketModel.find({ assignedTo: "" });
        res.status(200).json(ticket);
    } 
    catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function createTicket(
    req: express.Request,
    res: express.Response
): Promise<void> {
    const newTicket = new TicketModel({
        id: new mongoose.Types.ObjectId,
        title: req.body.title,
        projectName: req.body.projectName,
        assignedTo: req.body.assignedTo,
        description: req.body.description,
        priority: req.body.priority
    });

    const validationError = newTicket.validateSync();
    if (validationError) {
        res.status(400).json(validationError);
        return;
    }

    try {
        await newTicket.save();
        res.status(201).json(newTicket);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function updateTicket(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try {
        const updateTicket = await TicketModel.findOneAndUpdate({ title: req.params.title },
            { $set: 
                { 
                title: req.body.title, projectName: req.body.projectName, assignedTo: req.body.assignedTo, 
                description: req.body.description, status: req.body.status, updateDate: new Date(), priority: req.body.priority
                }
            });
        res.status(200).json(updateTicket);
    } 
    catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function deleteTicket(
    req: express.Request,
    res: express.Response
): Promise<void> {
    try {
        const deletedTicket = await TicketModel.findOneAndDelete({ title: req.params.title });
        if (!deletedTicket) {
            res.status(400).json({ 'message': 'No Ticket With Such Title' });
            return;
        }
        res.status(200).json(deletedTicket);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}