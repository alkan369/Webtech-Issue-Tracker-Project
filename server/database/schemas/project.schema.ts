import { Schema } from 'mongoose';

export const ProjectSchema = new Schema({
    id: Schema.Types.ObjectId,
    projectName: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    description: {
        type: Schema.Types.String,
        default: "",
    },
    startDate: {
        type: Schema.Types.Date,
        default: new Date(),
    },
    updateDate: {
        type: Schema.Types.Date,
        default: new Date(),
    },
    status: {
        type: Schema.Types.String,
        required: true,
        enum: ['in progress', 'done'],
    }
})