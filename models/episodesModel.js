const mongoose = require("mongoose")

const episodesSchema = new mongoose.Schema({
    animeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Anime",
        required: true
    },
    episodesNumber: {
        type: Number,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // Đơn vị phút hoặc giây
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["ongoing", "completed", "delayed"],
        default: "ongoing"
    },
    create: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Episodes", episodesSchema);