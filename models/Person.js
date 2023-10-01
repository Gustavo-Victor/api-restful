import mongoose from "mongoose";

// const personSchema = new mongoose.Schema({
//     name: String, 
//     salary: Number, 
//     approved: Boolean
// }); 

// const Person = mongoose.model('Person', personSchema); 
//export Person; 

const Person = mongoose.model('Person', {
    name: String,
    email: String, 
    salary: Number,
    approved: Boolean
}); 

export default Person; 