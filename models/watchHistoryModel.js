const mongoose = require("mongoose");

const watchHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    episodeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Episodes",
        required: true
    },
    animeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Anime",
        required: true
    },
    watchedAt: {
        type: Date,
        default: Date.now
    },
    progress: {
        type: Number, // Tiến độ xem (tính theo giây hoặc phần trăm)
        default: 0
    }
});

module.exports = mongoose.model("WatchHistory", watchHistorySchema);