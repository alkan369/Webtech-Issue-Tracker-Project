import { model } from 'mongoose';
import { TicketSchema } from '../schemas/ticket.schema';

export const TicketModel = model("Ticket", TicketSchema);