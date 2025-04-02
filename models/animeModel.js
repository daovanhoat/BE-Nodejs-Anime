const mongoose = require("mongoose")

const animeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    releaseYear: {
        type: Number
    },
    status: {
        type: String,
        enum: ["ongoing", "completed", "upcoming"], 
        required: true
    },
    imageUrl: {
        type: String
    },
    videoUrl: {
        type: String
    },
    views: { 
        type: Number, 
        default: 0 
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Anime", animeSchema);