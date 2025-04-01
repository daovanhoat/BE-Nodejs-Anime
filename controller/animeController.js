const mongoose = require("mongoose");

const Anime = require("../models/animeModel");

//Khai bao API
//Them moi anime moi
const createAnime = async (req, res) => {
    //B1 thu thap du lieu
    try {
        let bodyRequest = req.body;

        //B2 validate du lieu dau vao
        if(!bodyRequest.title) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "title is required"
            });
        }

        if(!bodyRequest.status) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "title is required"
            });
        }

        //B3 thao tac voi co so du lieu
        let newAnime = {
            _id: new mongoose.Types.ObjectId(),
            title: bodyRequest.title,
            description: bodyRequest.description,
            releaseYear: bodyRequest.releaseYear,
            status: bodyRequest.status,
            imageUrl: bodyRequest.imageUrl,
            videoUrl: bodyRequest.videoUrl,
            created: new Date()
        };

        const animeCreated  = await Anime.create(newAnime);

        return res.status(201).json({
            status:"Success",
            message: "Anime created successfully",
            data: animeCreated
        });

    } catch (error) {
        return res.status(500).json({
            status:"Error 500: Internal Server Error",
            message: error.message
        })
    }
}

//Lay danh sach anime
const getAllAnime = async (req, res) => {
    //B1 gui yeu cau lay danh sach tu DB
    try {
        let animeList = await Anime.find({})

        //B2 kiem tra du lieu rong
        if(animeList.length === 0) {
            return res.status(404).json({
                status: "Error 404: Not Found",
                message: "No anime found"
            });
        }

        //B3 Tra ve danh sach anime
        return res.status(200).json({
            status:"Sucesss",
            message:"Retrieved anime list successfully",
            data: animeList
        });

    } catch(error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        })
    }n
}

//Lay chi tiet anime theo id
const getAnimeById = async (req, res) => {
    //B1 Thu thap du lieu tu request
    try{
        let animeId = req.params.id;

        //B2 Kiem tra du lieu
        if(!mongoose.Types.ObjectId.isValid(animeId)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Invalid anime ID"
            });
        }

        //B3 Tim anime theo ID
        let anime = await Anime.findById(animeId);

        //Neu khong tim thay anime
        if(!anime) {
            return res.status(404).json({
                status: "Error 404: Not found",
                message: "Anime not found"
            });
        }
        //B4 tra ve du lieu anime
        return res.status(200).json({
            status: "Success",
            message:"Retrieved anime details successfully",
            data: anime
        });

    } catch(error){
        return res.status(500).json({
            status:"Error 500: Internal Server Error",
            message: error.message
        })
    }
}
//Cap nhat thong tin anime
const updateAnime = async (req, res) => {
    try{
        //B1 Thu thap du lieu tu request
        let animeId = req.params.id;
        let bodyRequest = req.body;

        //B2 kiem tra xem id hop le khong
        if(!mongoose.Types.ObjectId.isValid(animeId)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Invalid anime ID"
            });
        }

        //B3 Cap nhat anime trong DB
        let updatedAnime = await Anime.findByIdAndUpdate(animeId, bodyRequest, {new: true});
        
        //Khong tim thay anime tra ve loi 404
        if(!updatedAnime) {
            return res.status(404).json({
                status: "Error 404: Not Found",
                message: "Anime not fonund"
            });
        }

        //B4 Tra ve ket qua cap nhat thanh cong
        return res.status(200).json({
            status: "Success: Anime updated successfully",
            data: updatedAnime
        })

    } catch(error) {
        return res.status(500).json({
            status: "Error 500: Internl Server Error",
            message: error.message
        })
    }
}
//Xoa mot animie
const deleteAnime = async (req, res) => {
    try{
        //B1 Lay du lieu tu request
        let animeId = req.params.id;
        
        //B2 kiem tra du lieu
        if(!mongoose.Types.ObjectId.isValid(animeId)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Invalid anime ID"
            });
        }

        //B3 Xoa anime trong DB
        let deletedAnime = await Anime.findByIdAndDelete(animeId);

        //Neu khong tim thay anime, tra ve loi 404
        if(!deletedAnime) {
            return res.status(404).json({
                status:"Error 404: Not Found",
                message: "Anime not found"
            });
        }
        
        //B4 tra ve ket qua xoa thanh cong
        return res.status(200).json({
            status: "Success: Anime deleted successfully",
            data: deletedAnime
        });

    } catch(error) {
        return res.status(500).json({
            status:"Error 500: Internal Server Error",
            message: error.message
        })
    }
}

//Tim kiem mot anime theo tieu de
const searchAnime = async (req, res) => {
    try{
        //B1 Thu thap du lieu tu request
        let searchTitle = req.query.title;

        //b2 kiem tra du lieu
        if(!searchTitle) {
            return res.status(400).json({
                status:"Error 400: Bad request",
                message:"title is required"
            })
        }

        //B3 tim kiem anime theo tieu de gan dung
        const animes = await Anime.find({
            title: { $regex: searchTitle, $options: "i" } // "i" = Không phân biệt chữ hoa/thường
        }).exec();

        if(animes.length === 0) {
            return res.status(400).json({
                status: "Error 404: Not Found",
                message: `No anime found with title containing '${searchTitle}' `
            });
        }

        return res.status(200).json({
            status:"Sucess",
            data: animes
        })

    } catch (error) {
        return res.status(500).json({
            status:"Error 500: Internal Server Error",
            message: error.message
        });
    }
}

module.exports = { createAnime, getAllAnime, getAnimeById, updateAnime, deleteAnime, searchAnime };