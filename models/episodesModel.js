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
    create: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Episodes", episodesSchema);