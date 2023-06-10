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
        match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Invalid email'],
        unique: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/, 'Weak password'],
    },
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    createDate: {
        type: Schema.Types.Date,
        default: new Date(),
    }
});
