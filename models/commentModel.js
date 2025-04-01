const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    animeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Anime",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    create: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Comment", commentSchema);