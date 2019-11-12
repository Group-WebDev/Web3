import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: password,
        required:true
    }
});

const Admin = mongoose.model('Admin', userSchema);
export default Admin;