import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    eventTitle: {
        type: String,
        unique: true,
        required:true
    },
    address: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    image:{
        type:File,
    }
});

const Events = mongoose.model('Events', userSchema);
export default Events;