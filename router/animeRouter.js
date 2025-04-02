const express = require("express");
//khai bao router
const animeRouter = express.Router();

//Su dung controller
const { createAnime, getAllAnime, getAnimeById, updateAnime, deleteAnime, searchAnime, increaseAnimeView } = require("../controller/animeController");

//Create Anime
animeRouter.post('/anime/create', createAnime);
//Lay danh sach
animeRouter.get('/anime', getAllAnime);
// Lay chi tiet theo id
animeRouter.get('/anime/:id', getAnimeById);
//Cap nhat mot anime
animeRouter.put('/anime/:id', updateAnime);
//Xoa mot anime
animeRouter.delete('/anime/:id', deleteAnime);
//Tim kiem theo tieu de
animeRouter.post('/anime/search', searchAnime);
//Tăng số lượt xem
animeRouter.post('/anime/:animeId/increaseView', increaseAnimeView);

module.exports = animeRouter;