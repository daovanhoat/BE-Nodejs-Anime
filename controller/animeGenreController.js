const mongoose = require("mongoose");

const AnimeGenre = require("../models/animeGenreModel");

//Khai bao API
//Tao the loai moi
const createAnimeGener = async (req, res) => {
    try{
        //B1 Lay du lieu tu nguoi dung
        let bodyRequest = req.body;

        //B2 kiem tra du lieu
        if(!mongoose.Types.ObjectId.isValid(bodyRequest.animeId) || !mongoose.Types.ObjectId.isValid(bodyRequest.generId)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Invalid animeId or generId"
            })
        }

        //B3 Thao tac voi co so du lieu
        let newAnimeGener = new AnimeGenre({
            _id: new mongoose.Types.ObjectId(),
            animeId: bodyRequest.animeId,
            generId: bodyRequest.generId
        })

        const createdAnimeGener = await newAnimeGener.save();

        return res.status(201).json({
            status: "Success, Anime gener created successfully",
            data: createAnimeGener
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        })
    }
}

//Lay danh sach the loai anime
const getAllAnimeGener = async (req, res) => {
    try {

        const animeGener = await AnimeGenre.find().populate("animeId generId");

        return res.status(200).json({
            status: "Success: Retrieved all anime gener",
            data: animeGener
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        })
    }
}

//Lay the loai anime theo id
const getAnimeGenerById = async (req, res) => {
    try{
        //B1 thu thap du lieu
        let generId = req.params.id;

        //B2 kiem tra du lieu
        if(!mongoose.Types.ObjectId.isValid(generId)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Invalid gener ID"
            });
        }

        //B3 thao tac voi co so du lieu
        const animeGeners = await AnimeGenre.find({genreId}).populate("animeId generId");

        if(animeGeners === 0) {
            return res.status(404).json({
                status: "Error 404: Not found",
                message: "No anime found this with gener"
            });
        }

        return res.status(200).json({
            status: "Success: Retrieved anime by gener",
            data: animeGeners
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        });
    }
}

//Cap nhat the loai anime
const updateAnimeGener = async (req, res) => {
    try{ 
        //B1 thu thap du lieu
        let animeGernerId = req.params.id;
        let { animeId, generId } = req.body;

        //B2 kiem tra du lieu
        if(!mongoose.Types.ObjectId.isValid(animeGernerId)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Invalid animegener ID"
            });
        }

        const updatedAnimeGener = await AnimeGenre.findByIdAndUpdate(
            animeGernerId,
            { animeId, generId },
            { new: true }
        );

        if(!updatedAnimeGener) {
            return res.status(404).json({
                status: "Error 404: Not Found",
                message: "Anime gener not found"
            });
        }

        return res.status(200).json({
            status: "Success: Anime gener updated successfully",
            data: updatedAnimeGener
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        });
    }
}

//Xoa the loai
const deleteAnimeGener = async (req, res) => {
    try{
        //b1 thu thap du lieu
        let animeGenerId = req.params.id;

        //b2 kiem tra du lieu
        if(!mongoose.Types.ObjectId.isValid(animeGenerId)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Invalid animeGener Id"
            });
        }

        //b3 Thao tac voi co so du lieu
        const deletedAnimeGener = await AnimeGenre.findByIdAndDelete(animeGenerId);

        if(!deleteAnimeGener) {
            return res.status(404).json({
                status: "Error 404: Not found",
                message: "Anime gener not found"
            });
        }

        return res.status(200).json({
            status: "Success: Anime gener deleted successfully",
            data: deletedAnimeGener
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        });
    }
}

//Lọc anime theo thể loại
const getAnimesByGener = async (req, res) => {
    try{ 
        //B1 Thu thap du lieu
        let generId = req.params.id;

        //b2 kiem tra du lieu
        if(!mongoose.Types.ObjectId.isValid(generId)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Invalid gener ID"
            });
        }

        //Tim tat ca anime thuoc cung mot the loai
        const animeList = await AnimeGenre.find({genreId}).populate("animeId", "title imageUrl");

        if(!animeList.length) {
            return res.status(404).json({
                status: "Error 404: Not found",
                message: "No anime found for this gener"
            });
        }

        return res.status(200).json({
            status: "Success: Retrieved anie by gener successfully",
            data: animeList
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        });
    }
}

module.exports = { createAnimeGener, getAllAnimeGener, getAnimeGenerById, updateAnimeGener, deleteAnimeGener, getAnimesByGener }