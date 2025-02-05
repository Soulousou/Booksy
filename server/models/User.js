const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    books: [{
        id: { type: String, required: true },
        title: { type: String, required: true },
        authors: { type: String },
        description: { type: String },
        image: { type: String },
        review: { type: String },
        pageCount: { type: Number },
        pagenow: { type: Number },
        rating: { type: Number },
        notes: [{
            time: { type: String },
            content: { type: String }
        }]
    }],
    shelves: {
        type: [{
            shelfName: { type: String, required: true },
            bookIds: [{ type: String }]
        }],
        default: () => [
            { shelfName: 'Currently Reading', bookIds: [] },
            { shelfName: 'Want To Read', bookIds: [] },
            { shelfName: 'Read', bookIds: [] }
        ]
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;