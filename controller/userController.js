const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");

// lay danh sach nguoi dung
const getUsers = async (req, res) => {
    try {
        //B1 gui yeu cau lay danh sach nguoi dung
        let userList = await User.find({})

        //B2 Kiem tra du lieu rong
        if(userList.length === 0) {
            return res.status(404).json({
                status: "Error 404: Not found",
                message: "No user found"
            });
        }

        //B3 tra ve danh sach nguoi dung
        return res.status(200).json({
            status: "Success: Retrieved user list successfully",
            data: userList
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        })
    }
};

// tao danh sach nguoi dung
const createUser = async (req, res) => {
    try {
        //B1 Thu thap du lieu
        let bodyRequest = req.body;

        //B2 Kiem tra du lieu
        if(!bodyRequest.username || !bodyRequest.email || !bodyRequest.password) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Vui long dien day du thong tin"
            });
        }
        
        //B3 thao tac voi co so du lieu
        let newUser = {
            _id: new mongoose.Types.ObjectId(),
            username: bodyRequest.username,
            email: bodyRequest.email,
            password: bodyRequest.password,
            created: new Date()
        }

        const userCreated = await User.create(newUser);

        return res.status(200).json({
            status: "Success",
            message: "User created successfully",
            data: userCreated
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: error.message
        })
    }
};

module.exports = {getUsers, createUser};