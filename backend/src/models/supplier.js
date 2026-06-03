import {Schema, model} from "mongoose";

const suplierSchema = new Schema({
    name: { type: String},
    email: { type: String},
    phone: {type: String},
    img: { type: String},
    address: { type: String},
    isVerified: { type: Boolean},

},{
    timestamps: true,
    strict: false
});

export default model("Suppliers", suplierSchema);