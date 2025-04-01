const express = require("express");
//Khai bao router
const animeGenerRouter = express.Router();

//Su dung controller
const { createAnimeGener, getAllAnimeGener, getAnimeGenerById, updateAnimeGener, deleteAnimeGener, getAnimesByGener } = require("../controller/animeGenreController");

//Tao the loai anime
animeGenerRouter.post('/animeGener/create', createAnimeGener);
//Lay danh sach the loai anime
animeGenerRouter.get('/animeGener', getAllAnimeGener);
//Lay the loai anime theo id
animeGenerRouter.get('/animeGener/:id', getAnimeGenerById);
//Cap nhat the loai anime
animeGenerRouter.put('/animeGener/:id', updateAnimeGener);
//Xoa the loai anime
animeGenerRouter.delete('/animeGener/:id', deleteAnimeGener);
//Loc anime theo cung mot the loai
animeGenerRouter.get('/animeGener/:generId', getAnimesByGener)

module.exports = animeGenerRouter;