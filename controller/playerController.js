const playerModel = require("../model/playerModel")
const playerProfile = require("../model/playerProfile")
const carInventoryModel = require("../model/playerInventoryModel")
const jwt = require("jsonwebtoken")
const fs = require('fs');
const path = require('path');
const publicDirectory = path.join(__dirname, '../uploads');
const { validationResult } = require('express-validator');

//  Registration and login is happening in the same api 
exports.login = async (req, res) => {
    try {
        const reqBody = req.body
        const { email } = reqBody
        if (!email)
            return res.send({ responseCode: 200, success: false, responseMessage: "Email is required" })

        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.send({ responseCode: 200, success: false, responseMessage: "Invalid email" })

        const playerData = await playerModel.findOne({ email: email })
        if (playerData) {
            const accessToken = jwt.sign(
                {
                    success: true,
                    message: "User detail !",
                    user: {
                        email: playerData.email,
                        _id: playerData._id,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1d" }
            );

            return res.send({ responseCode: 200, success: true, responseMessage: "Player login successfully", responseResult: playerData, token: accessToken })
        }
        else {

            const registration = await playerModel.create({
                email: email
            })

            const accessToken = jwt.sign(
                {
                    success: true,
                    message: "User detail !",
                    user: {
                        email: registration.email,
                        _id: registration._id,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1d" }
            );

            return res.send({ responseCode: 200, success: true, responseMessage: "Player created successfully", responseResult: registration, token: accessToken })
        }
    }
    catch (error) {
        return res.send({ responseCode: 400, responseMessage: "Something went wrong", responseResult: error.message })
    }
}



//Post Add and updated profile is happening in the same api
exports.playerProfile = async (req, res) => {
    try {
        const user = req.user;
        const id = user._id;

        const reqBody = req.body
        const { name, email, playerCoins, playerExperience, playerLevel } = reqBody

        if (!name || !email)
            return res.send({ responseCode: 200, success: false, responseMessage: "All feilds are required" })

        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.send({ responseCode: 200, success: false, responseMessage: "Invalid email" })

        const player = await playerModel.findOne({ _id: id })
        if (!player)
            return res.send({ responseCode: 200, success: false, responseMessage: "You are not a player!" })

        const findPlayer = await playerProfile.findOne({ user_id: player.id })
        if (findPlayer != null) {
            const playerProfileData = await playerProfile.findOneAndUpdate(
                { user_id: player.id },
                {
                    $set: {
                        user_id: id,
                        name: name,
                        email: email,
                        profileImage: `${req.file.filename}`
                    }
                },
                { new: true }

            )
            return res.send({ responseCode: 200, success: true, responseMessage: "Player profile update successffully", responseResult: playerProfileData })
        }
        else {
            const createProfile = await playerProfile.create({
                user_id: id,
                name: name,
                email: email,
                profileImage: `${req.file.filename}`
            })
            return res.send({ responseCode: 200, success: true, responseMessage: "Profile created  successfully", responseResult: createProfile })
        }
    }
    catch (error) {
        return res.send({ responseCode: 400, responseMessage: "Something went wrong", responseResult: error.message })

    }
}

//Get Specific profile
exports.specificProfile = async (req, res) => {
    try {
        const user = req.user;
        const id = user._id;
        const player = await playerModel.findOne({ _id: id })
        if (!player)
            return res.send({ responseCode: 200, success: false, responseMessage: "You are not a player!" })
        const specificUser = await playerProfile.findOne({ user_id: player._id })
        if (specificUser == null) {
            return res.send({ responseCode: 200, success: false, responseMessage: "First you have to add profile" })
        }
        else {

            return res.send({ responseCode: 200, success: true, responseMessage: "Specific user profile get successfully", responseResult: specificUser })
        }

    }
    catch (error) {
        return res.send({ responseCode: 400, responseMessage: "Something went wrong", responseResult: error.message })

    }
}



//Post player inventory
exports.carInventory = async (req, res) => {
    try {
        const user = req.user;
        const id = user._id;

        const player = await playerModel.findOne({ _id: id })
        if (!player)
            return res.send({ responseCode: 200, success: false, responseMessage: "You are not a player!" })

        const reqBody = req.body
        const { carInventory, powerups } = reqBody
        if (!carInventory || !powerups)
            return res.send({ responseCode: 200, success: false, responseMessage: "All  feilds are required" })

        const findCarInventory = await carInventoryModel.findOne({ user_id: player.id })
        if (findCarInventory != null) {
            const carInventoryData = await carInventoryModel.findOneAndUpdate(
                { user_id: player.id },
                {
                    $set: {
                        carInventory: carInventory,
                        powerups: powerups,
                    }
                },
                { new: true }

            )
            return res.send({ responseCode: 200, success: true, responseMessage: "Car Inventory updated successffully", responseResult: carInventoryData })
        }
        const carData = await carInventoryModel.create({
            carInventory: carInventory,
            powerups: powerups,
            user_id: id

        })
        return res.send({ responseCode: 200, success: true, responseMessage: "Car inventory created sucessfully", responseResult: carData })

    }
    catch (error) {
        return res.send({ responseCode: 400, responseMessage: "Something went wrong", responseResult: error.message })

    }
}



//Get player car inventory
exports.specificCarInventory = async (req, res) => {
    try {
        const user = req.user;
        const id = user._id;
        const player = await playerModel.findOne({ _id: id })
        if (!player)
            return res.send({ responseCode: 200, success: false, responseMessage: "You are not a player!" })

        const inventoryData = await carInventoryModel.findOne({ user_id: player._id })
        if (!inventoryData) {
            return res.send({ responseCode: 200, success: false, responseMessage: "Inventory is not found" })
        }
        else {
            return res.send({ responseCode: 200, success: true, responseMessage: "Inventory get successfully", responseResult: inventoryData })
        }
    }
    catch (error) {
        return res.send({ responseCode: 400, responseMessage: "Something went wrong", responseResult: error.message })
    }
}



exports.playerStats = async (req, res) => {
    try {
        const user = req.user;
        const id = user._id;
        const reqBody = req.body
        const { playerCoins, xp } = reqBody

        const player = await playerModel.findOne({ _id: id })
        if (!player)
            return res.send({ responseCode: 200, success: false, responseMessage: "You are not a player!" })

        if (!playerCoins || !xp)
            return res.send({ responseCode: 200, success: false, responseMessage: "All feilds are required" })
        const findStats = await playerProfile.findOne({ user_id: player.id })
        const totalXp = Number(findStats.playerExperience) + Number(xp);

        const getLevel = await getLevelForPlayer(totalXp);

        if (findStats != null) {
            const playerStatsData = await playerProfile.findOneAndUpdate(
                { user_id: player.id },
                {
                    $set: {
                        playerCoins: Number(findStats.playerCoins) + Number(playerCoins),
                        playerExperience: totalXp,
                        playerLevel: getLevel,
                    }
                },
                { new: true }

            )
            return res.send({ responseCode: 200, success: true, responseMessage: "Player stats updated successffully", responseResult: playerStatsData })
        }

        const statsData = await playerProfile.create({
            playerCoins: playerCoins,
            playerExperience: xp,
            playerLevel: getLevel,
            user_id: id
        })
        return res.send({ responseCode: 200, success: true, responseMessage: "Player stats created successfully", responseResult: statsData })
    }
    catch (error) {
        return res.send({ responseCode: 400, responseMessage: "Something went wrong", responseResult: error.message })
    }
}


const getLevelForPlayer = async (xp) => {
    try {
        playerLevel = null;
        if (xp < 100) {
            playerLevel = 1;
        }
        else if (xp == 100 && xp < 150) {
            playerLevel = 2
        }
        else if (xp == 150 && xp < 200) {
            playerLevel = 3
        }
        else if (xp == 200 && xp < 250) {
            playerLevel = 4
        }
        else if (xp == 250 && xp < 300) {
            playerLevel = 5
        }
        else if (xp == 300 && xp < 350) {
            playerLevel = 6
        }
        else if (xp == 350 && xp < 400) {
            playerLevel = 7
        }
        else if (xp == 400 && xp < 450) {
            playerLevel = 8
        }
        else if (xp == 450 && xp < 500) {
            playerLevel = 9
        }
        else if (xp == 500 && xp < 550) {
            playerLevel = 10
        }
        else if (xp == 550 && xp < 600) {
            playerLevel = 11
        }
        else if (xp == 600 && xp < 650) {
            playerLevel = 12
        }
        else if (xp == 650 && xp < 700) {
            playerLevel = 13
        }
        else if (xp == 700 && xp < 750) {
            playerLevel = 14
        }
        else if (xp >= 750) {
            playerLevel = 15
        }

        return playerLevel;
    } catch (error) {
        return res.send({ responseCode: 400, responseMessage: "Something went wrong", responseResult: error.message })
    }
}