import mongoose from 'mongoose';

// Schema for pralay user logging in the app
const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    gender:{type: String, required: true},
    assister: {type: String},
    mobileNo: {type: String, required: true, unique: true},
    emailId: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

const pralayUser = mongoose.model('pralayUser', userSchema);

export default pralayUser;