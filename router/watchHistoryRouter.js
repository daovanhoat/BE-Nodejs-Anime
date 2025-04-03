const express = require("express");
//khai bao router
const  watchHistoryRouter = express.Router();

//Su dung controller
const {
    saveWatchHistory,
    getWatchHistoryByUser,
    deleteWatchHistory
} = require("../controller/watchHistoryController");

//Lưu lịch sử xem phim
watchHistoryRouter.post('/watchHistory', saveWatchHistory);
//Lấy lịch sử xem phim của người dùng
watchHistoryRouter.get('/watchHistory/:userId', getWatchHistoryByUser);
// Xóa lịch sử xem phim của người dùng
watchHistoryRouter.delete('/watchHistory/:id', deleteWatchHistory);


module.exports = watchHistoryRouter;