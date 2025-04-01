const mongoose = require("mongoose");

const Gener = require("../models/genersModel");
const AnimeGenre = require("../models/animeGenreModel"); // Import model AnimeGenre

//Khai bao API
//Tao mot the loai moi
const createGener = async (req, res) => {
    //B1 thu thap du lieu
    try {
        let bodyRequest = req.body;

        //B2 kiem tra du lieu
        if(!bodyRequest.name) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Name is required"
            });
        }

        let newGener = {
            _id: new mongoose.Types.ObjectId(),
            name: bodyRequest.name,
            created: new Date()
        }

        const generCreated = await Gener.create(newGener);

        return res.status(201).json({
            status: "Success: Gener created successfully",
            data: generCreated
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        })
    }
}

// 2️⃣ Lấy danh sách tất cả thể loại anime
const getAllGenres = async (req, res) => {
    try {
        const genres = await Gener.find();

        return res.status(200).json({
            status: "Success",
            message: "Retrieved all genres successfully",
            data: genres
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        });
    }
};

// 3️⃣ Lấy thể loại anime theo ID
const getGenreById = async (req, res) => {
    try {
        let genreId = req.params.id;

        // Kiểm tra ID hợp lệ
        if (!mongoose.Types.ObjectId.isValid(genreId)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Invalid genre ID"
            });
        }

        const genre = await Gener.findById(genreId);
        if (!genre) {
            return res.status(404).json({
                status: "Error 404: Not Found",
                message: "Genre not found"
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Genre retrieved successfully",
            data: genre
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        });
    }
};

// 4️⃣ Cập nhật thể loại anime
const updateGenre = async (req, res) => {
    try {
        let genreId = req.params.id;
        let bodyRequest = req.body;

        if (!mongoose.Types.ObjectId.isValid(genreId)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Invalid genre ID"
            });
        }

        // Kiểm tra xem tên mới có bị trùng không
        const existingGenre = await Genre.findOne({ name: bodyRequest.name });
        if (existingGenre && existingGenre._id.toString() !== genreId) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Genre name already exists"
            });
        }

        const updatedGenre = await Genre.findByIdAndUpdate(genreId, bodyRequest, { new: true });

        if (!updatedGenre) {
            return res.status(404).json({
                status: "Error 404: Not Found",
                message: "Genre not found"
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Genre updated successfully",
            data: updatedGenre
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        });
    }
};


// 5️⃣ Xóa thể loại anime
const deleteGenre = async (req, res) => {
    try {
        let genreId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(genreId)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Invalid genre ID"
            });
        }

        // Kiểm tra xem thể loại có đang được sử dụng trong AnimeGenre không
        const isGenreUsed = await AnimeGenre.findOne({ genreId });
        if (isGenreUsed) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Cannot delete genre. It is being used in AnimeGenre."
            });
        }

        const deletedGenre = await Genre.findByIdAndDelete(genreId);
        if (!deletedGenre) {
            return res.status(404).json({
                status: "Error 404: Not Found",
                message: "Genre not found"
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Genre deleted successfully",
            data: deletedGenre
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        });
    }
};

// 🛠 Export tất cả controller
module.exports = {
    createGener,
    getAllGenres,
    getGenreById,
    updateGenre,
    deleteGenre
};