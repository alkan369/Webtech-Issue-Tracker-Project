import { Request } from "express"

export const validTicketStatus = ['open', 'in progress', 'resolved'];
export const validTicketPriorities = ['Low', 'Medium', "High"];

export interface Ticket{
    id: string,
    title: string,
    projectId: string,
    assignedTo: string,
    description: string,
    createDate: Date,
    updateDate: Date,
    status: string,
    priority: string
}

export interface TicketRequest extends Request{
    ticket: Ticket;
}