import { Schema } from 'mongoose';
import { getTicketByStatus } from '../statics/ticket.methods';

export const TicketSchema = new Schema({
    id: Schema.Types.ObjectId,
    title: {
        type: Schema.Types.String,
        required: true,
        unique:true,
    },
    projectName: {
        type: Schema.Types.String,
        default: "",
    },
    assignedTo: {
        type: Schema.Types.String,
        default: "",
    },
    description: {
        type: Schema.Types.String,
        default: "",
    },
    createDate: {
        type: Schema.Types.Date,
        default: new Date(),
    },
    updateDate: {
        type: Schema.Types.Date,
        default: new Date(),
    },
    status: {
        type: Schema.Types.String,
        default: 'Open',
        enum: ['Open', 'In progress', 'Resolved'],
    },
    priority: {
        type: Schema.Types.String,
        required: true,
        enum: ['Low', 'Medium', 'High'],
    }
});
