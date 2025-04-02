const mongoose = require("mongoose");
const Episodes = require("../models/episodesModel");

// 1️⃣ Tạo tập phim mới
const createEpisode = async (req, res) => {
    try {
        let { animeId, episodesNumber, videoUrl, duration, status } = req.body;
        
        if (!animeId || !episodesNumber || !videoUrl) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Anime ID, episode number, and video URL are required"
            });
        }

        let newEpisode = new Episodes({
            animeId,
            episodesNumber,
            videoUrl,
            duration: duration || 0,
            status: status || "ongoing"
        });

        const savedEpisode = await newEpisode.save();
        return res.status(201).json({
            status: "Success",
            message: "Episode created successfully",
            data: savedEpisode
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        });
    }
};

// 2️⃣ Lấy danh sách tập phim của một anime
const getEpisodesByAnimeId = async (req, res) => {
    try {
        let animeId = req.params.animeId;
        if (!mongoose.Types.ObjectId.isValid(animeId)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Invalid anime ID"
            });
        }
        
        let episodes = await Episodes.find({ animeId }).sort("episodesNumber");
        return res.status(200).json({
            status: "Success",
            message: "Episodes retrieved successfully",
            data: episodes
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        });
    }
};

// 3️⃣ Lấy thông tin chi tiết của một tập phim
const getEpisodeById = async (req, res) => {
    try {
        let episodeId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(episodeId)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Invalid episode ID"
            });
        }
        
        let episode = await Episodes.findById(episodeId);
        if (!episode) {
            return res.status(404).json({
                status: "Error 404: Not Found",
                message: "Episode not found"
            });
        }
        
        return res.status(200).json({
            status: "Success",
            message: "Episode retrieved successfully",
            data: episode
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        });
    }
};

// 4️⃣ Cập nhật tập phim
const updateEpisode = async (req, res) => {
    try {
        let episodeId = req.params.id;
        let updateData = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(episodeId)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Invalid episode ID"
            });
        }

        const updatedEpisode = await Episodes.findByIdAndUpdate(episodeId, updateData, { new: true });
        if (!updatedEpisode) {
            return res.status(404).json({
                status: "Error 404: Not Found",
                message: "Episode not found"
            });
        }
        
        return res.status(200).json({
            status: "Success",
            message: "Episode updated successfully",
            data: updatedEpisode
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        });
    }
};

// 5️⃣ Xóa tập phim
const deleteEpisode = async (req, res) => {
    try {
        let episodeId = req.params.id;
        
        if (!mongoose.Types.ObjectId.isValid(episodeId)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Invalid episode ID"
            });
        }

        const deletedEpisode = await Episodes.findByIdAndDelete(episodeId);
        if (!deletedEpisode) {
            return res.status(404).json({
                status: "Error 404: Not Found",
                message: "Episode not found"
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Episode deleted successfully",
            data: deletedEpisode
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        });
    }
};

module.exports = {
    createEpisode,
    getEpisodesByAnimeId,
    getEpisodeById,
    updateEpisode,
    deleteEpisode
};
