const mongoose = require("mongoose");

const favoritesSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    animieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Episode",
        required: true
    }, 
}, { timestamps: true })

favoritesSchema.index({ userId: 1, animieId: 1 }, { unique: true });
module.exports = mongoose.model("Favorites", favoritesSchema);