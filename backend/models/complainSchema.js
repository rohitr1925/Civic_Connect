const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    typeOfTicket: {
        type: String,
        enum: ['Maintenance', 'Technical Support', 'Other','Service'], // Assuming limited types of tickets
        required: true
    },
    location: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    }
});

module.exports = mongoose.model("complain", complainSchema);
