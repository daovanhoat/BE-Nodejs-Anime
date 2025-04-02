const express = require("express");
//khai bao router
const episodeRouter = express.Router();

//Su dung controller
const {
    createEpisode,
    getEpisodesByAnimeId,
    getEpisodeById,
    updateEpisode,
    deleteEpisode
} = require("../controller/episodesController");

//Create Anime
episodeRouter.post('/gener', createEpisode);
//Lay danh sach
episodeRouter.get('/gener/:animeId', getEpisodesByAnimeId);
// Lay chi tiet theo id
episodeRouter.get('/gener/:id', getEpisodeById);
//Cap nhat mot anime
episodeRouter.put('/gener/:id', updateEpisode);
//Xoa mot anime
episodeRouter.delete('/anime/:id', deleteEpisode);


module.exports = episodeRouter;