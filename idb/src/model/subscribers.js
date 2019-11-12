import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required:true
    },
    address: {
        type: String,
        required:true
    }
});

const Subscribers = mongoose.model('Subscribers', userSchema);
export default Subscribers;