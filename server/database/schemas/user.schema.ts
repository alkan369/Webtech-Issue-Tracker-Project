import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    id: Schema.Types.ObjectId,
    firstName: {
        type: Schema.Types.String,
        required: true,
    },
    lastName: {
        type: Schema.Types.String,
        required: true,
    },
    email: {
        type: Schema.Types.String,
        required: true,
        match: [/([a-z0-9]+\.)*[a-z0-9]+@([a-z0-9]+\.)+[a-z0-9]+/, 'Invalid email'],
        unique: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    username: {
        type: Schema.Types.String,
        required: true,
        match: [/[A-Za-z0-9]{6,}$/, 'Invalid username'],
        unique: true,
    },
    createDate: {
        type: Schema.Types.Date,
        default: new Date(),
    },
    updateDate: {
        type: Schema.Types.Date,
        default: new Date(),
    },
});
