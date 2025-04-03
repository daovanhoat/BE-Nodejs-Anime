const mongoose = require("mongoose");
const WatchHistory = require("../models/watchHistoryModel");

// Lưu lịch sử xem hoặc cập nhật tiến độ
const saveWatchHistory = async (req, res) => {
    try {
        let { userId, episodeId, animeId, progress } = req.body;

        if (!userId || !episodeId || !animeId) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "User ID, Episode ID, and Anime ID are required"
            });
        }

        let history = await WatchHistory.findOne({ userId, episodeId });

        if (history) {
            // Nếu đã có lịch sử xem, cập nhật tiến độ
            history.progress = progress;
            await history.save();
        } else {
            // Nếu chưa có, tạo mới
            history = new WatchHistory({ userId, episodeId, animeId, progress });
            await history.save();
        }

        return res.status(200).json({
            status: "Success",
            message: "Watch history updated successfully",
            data: history
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        });
    }
};

// Lấy lịch sử xem của người dùng
const getWatchHistoryByUser = async (req, res) => {
    try {
        let userId = req.params.userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Invalid user ID"
            });
        }

        let history = await WatchHistory.find({ userId })
            .populate("animeId", "title")  // Lấy tiêu đề anime
            .populate("episodeId", "episodesNumber videoUrl"); // Lấy số tập và video

        return res.status(200).json({
            status: "Success",
            message: "Watch history retrieved successfully",
            data: history
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        });
    }
};

// Xóa lịch sử xem của người dùng
const deleteWatchHistory = async (req, res) => {
    try {
        let historyId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(historyId)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Invalid history ID"
            });
        }

        const deletedHistory = await WatchHistory.findByIdAndDelete(historyId);
        if (!deletedHistory) {
            return res.status(404).json({
                status: "Error 404: Not Found",
                message: "Watch history not found"
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Watch history deleted successfully",
            data: deletedHistory
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        });
    }
};

module.exports = {
    saveWatchHistory,
    getWatchHistoryByUser,
    deleteWatchHistory
};
