/*
campos
name
email
password
address
phone
salary
image
*/

import {Schema, model} from 'mongoose';

const employeeSchema = new Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    address: {type: String},
    phone: {type: String},
    salary: {type: Number},
    image: {type: String},
    public_id: {type: String}
}, {
    timestamps: true,
    strict: false
});

export default model('Employee', employeeSchema);