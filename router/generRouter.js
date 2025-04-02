const express = require("express");
//khai bao router
const generRouter = express.Router();

//Su dung controller
const {
    createGener,
    getAllGenres,
    getGenreById,
    updateGenre,
    deleteGenre
} = require("../controller/generController");

//Create Anime
generRouter.post('/gener', createGener);
//Lay danh sach
generRouter.get('/gener', getAllGenres);
// Lay chi tiet theo id
generRouter.get('/gener/:id', getGenreById);
//Cap nhat mot anime
generRouter.put('/gener/:id', updateGenre);
//Xoa mot anime
generRouter.delete('/gener/:id', deleteGenre);


module.exports = generRouter;