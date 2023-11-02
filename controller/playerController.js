// const playerModel = require("../model/playerModel")
// const playerProfile = require("../model/playerProfile")
// const carInventoryModel = require("../model/playerInventoryModel")
// const jwt = require("jsonwebtoken")
// const fs = require('fs');
// const path = require('path');
// const publicDirectory = path.join(__dirname, '../uploads');
// const { validationResult } = require('express-validator');

// //  Registration and login is happening in the same api 
// exports.login = async (req, res) => {
//     try {
//         const reqBody = req.body
//         const { email } = reqBody
//         if (!email)
//             return res.send({ responseCode: 200, success: false, responseMessage: "Email is required" })

//         const errors = validationResult(req);
//         if (!errors.isEmpty())
//             return res.send({ responseCode: 200, success: false, responseMessage: "Invalid email" })

//         const playerData = await playerModel.findOne({ email: email })
//         if (playerData) {
//             const accessToken = jwt.sign(
//                 {
//                     success: true,
//                     message: "User detail !",
//                     user: {
//                         email: playerData.email,
//                         _id: playerData._id,
//                     },
//                 },
//                 process.env.ACCESS_TOKEN_SECRET,
//                 { expiresIn: "1d" }
//             );

//             return res.send({ responseCode: 200, success: true, responseMessage: "Player login successfully", responseResult: playerData, token: accessToken })
//         }
//         else {

//             const registration = await playerModel.create({
//                 email: email
//             })

//             const accessToken = jwt.sign(
//                 {
//                     success: true,
//                     message: "User detail !",
//                     user: {
//                         email: registration.email,
//                         _id: registration._id,
//                     },
//                 },
//                 process.env.ACCESS_TOKEN_SECRET,
//                 { expiresIn: "1d" }
//             );

//             return res.send({ responseCode: 200, success: true, responseMessage: "Player created successfully", responseResult: registration, token: accessToken })
//         }
//     }
//     catch (error) {
//         return res.send({ responseCode: 400, responseMessage: "Something went wrong", responseResult: error.message })
//     }
// }



// //Post Add and updated profile is happening in the same api
// exports.playerProfile = async (req, res) => {
//     try {
//         const user = req.user;
//         const id = user._id;

//         const reqBody = req.body
//         const { name, email, playerCoins, playerExperience, playerLevel } = reqBody

//         if (!name || !email)
//             return res.send({ responseCode: 200, success: false, responseMessage: "All feilds are required" })

//         const errors = validationResult(req);
//         if (!errors.isEmpty())
//             return res.send({ responseCode: 200, success: false, responseMessage: "Invalid email" })

//         const player = await playerModel.findOne({ _id: id })
//         if (!player)
//             return res.send({ responseCode: 200, success: false, responseMessage: "You are not a player!" })

//         const findPlayer = await playerProfile.findOne({ user_id: player.id })
//         if (findPlayer != null) {
//             const playerProfileData = await playerProfile.findOneAndUpdate(
//                 { user_id: player.id },
//                 {
//                     $set: {
//                         user_id: id,
//                         name: name,
//                         email: email,
//                         profileImage: `${req.file.filename}`
//                     }
//                 },
//                 { new: true }

//             )
//             return res.send({ responseCode: 200, success: true, responseMessage: "Player profile update successffully", responseResult: playerProfileData })
//         }
//         else {
//             const createProfile = await playerProfile.create({
//                 user_id: id,
//                 name: name,
//                 email: email,
//                 profileImage: `${req.file.filename}`
//             })
//             return res.send({ responseCode: 200, success: true, responseMessage: "Profile created  successfully", responseResult: createProfile })
//         }
//     }
//     catch (error) {
//         return res.send({ responseCode: 400, responseMessage: "Something went wrong", responseResult: error.message })

//     }
// }

// //Get Specific profile
// exports.specificProfile = async (req, res) => {
//     try {
//         const user = req.user;
//         const id = user._id;
//         const player = await playerModel.findOne({ _id: id })
//         if (!player)
//             return res.send({ responseCode: 200, success: false, responseMessage: "You are not a player!" })
//         const specificUser = await playerProfile.findOne({ user_id: player._id })
//         if (specificUser == null) {
//             return res.send({ responseCode: 200, success: false, responseMessage: "First you have to add profile" })
//         }
//         else {

//             return res.send({ responseCode: 200, success: true, responseMessage: "Specific user profile get successfully", responseResult: specificUser })
//         }

//     }
//     catch (error) {
//         return res.send({ responseCode: 400, responseMessage: "Something went wrong", responseResult: error.message })

//     }
// }



// //Post player inventory
// exports.carInventory = async (req, res) => {
//     try {
//         const user = req.user;
//         const id = user._id;

//         const player = await playerModel.findOne({ _id: id })
//         if (!player)
//             return res.send({ responseCode: 200, success: false, responseMessage: "You are not a player!" })

//         const reqBody = req.body
//         const { carInventory, powerups } = reqBody
//         if (!carInventory || !powerups)
//             return res.send({ responseCode: 200, success: false, responseMessage: "All  feilds are required" })

//         const findCarInventory = await carInventoryModel.findOne({ user_id: player.id })
//         if (findCarInventory != null) {
//             const carInventoryData = await carInventoryModel.findOneAndUpdate(
//                 { user_id: player.id },
//                 {
//                     $set: {
//                         carInventory: carInventory,
//                         powerups: powerups,
//                     }
//                 },
//                 { new: true }

//             )
//             return res.send({ responseCode: 200, success: true, responseMessage: "Car Inventory updated successffully", responseResult: carInventoryData })
//         }
//         const carData = await carInventoryModel.create({
//             carInventory: carInventory,
//             powerups: powerups,
//             user_id: id

//         })
//         return res.send({ responseCode: 200, success: true, responseMessage: "Car inventory created sucessfully", responseResult: carData })

//     }
//     catch (error) {
//         return res.send({ responseCode: 400, responseMessage: "Something went wrong", responseResult: error.message })

//     }
// }



// //Get player car inventory
// exports.specificCarInventory = async (req, res) => {
//     try {
//         const user = req.user;
//         const id = user._id;
//         const player = await playerModel.findOne({ _id: id })
//         if (!player)
//             return res.send({ responseCode: 200, success: false, responseMessage: "You are not a player!" })

//         const inventoryData = await carInventoryModel.findOne({ user_id: player._id })
//         if (!inventoryData) {
//             return res.send({ responseCode: 200, success: false, responseMessage: "Inventory is not found" })
//         }
//         else {
//             return res.send({ responseCode: 200, success: true, responseMessage: "Inventory get successfully", responseResult: inventoryData })
//         }
//     }
//     catch (error) {
//         return res.send({ responseCode: 400, responseMessage: "Something went wrong", responseResult: error.message })
//     }
// }



// exports.playerStats = async (req, res) => {
//     try {
//         const user = req.user;
//         const id = user._id;
//         const reqBody = req.body
//         const { playerCoins, xp } = reqBody

//         const player = await playerModel.findOne({ _id: id })
//         if (!player)
//             return res.send({ responseCode: 200, success: false, responseMessage: "You are not a player!" })

//         if (!playerCoins || !xp)
//             return res.send({ responseCode: 200, success: false, responseMessage: "All feilds are required" })
//         const findStats = await playerProfile.findOne({ user_id: player.id })
//         const totalXp = Number(findStats.playerExperience) + Number(xp);

//         const getLevel = await getLevelForPlayer(totalXp);

//         if (findStats != null) {
//             const playerStatsData = await playerProfile.findOneAndUpdate(
//                 { user_id: player.id },
//                 {
//                     $set: {
//                         playerCoins: Number(findStats.playerCoins) + Number(playerCoins),
//                         playerExperience: totalXp,
//                         playerLevel: getLevel,
//                     }
//                 },
//                 { new: true }

//             )
//             return res.send({ responseCode: 200, success: true, responseMessage: "Player stats updated successffully", responseResult: playerStatsData })
//         }

//         const statsData = await playerProfile.create({
//             playerCoins: playerCoins,
//             playerExperience: xp,
//             playerLevel: getLevel,
//             user_id: id
//         })
//         return res.send({ responseCode: 200, success: true, responseMessage: "Player stats created successfully", responseResult: statsData })
//     }
//     catch (error) {
//         return res.send({ responseCode: 400, responseMessage: "Something went wrong", responseResult: error.message })
//     }
// }


// const getLevelForPlayer = async (xp) => {
//     try {
//         playerLevel = null;
//         if (xp < 100) {
//             playerLevel = 1;
//         }
//         else if (xp == 100 && xp < 150) {
//             playerLevel = 2
//         }
//         else if (xp == 150 && xp < 200) {
//             playerLevel = 3
//         }
//         else if (xp == 200 && xp < 250) {
//             playerLevel = 4
//         }
//         else if (xp == 250 && xp < 300) {
//             playerLevel = 5
//         }
//         else if (xp == 300 && xp < 350) {
//             playerLevel = 6
//         }
//         else if (xp == 350 && xp < 400) {
//             playerLevel = 7
//         }
//         else if (xp == 400 && xp < 450) {
//             playerLevel = 8
//         }
//         else if (xp == 450 && xp < 500) {
//             playerLevel = 9
//         }
//         else if (xp == 500 && xp < 550) {
//             playerLevel = 10
//         }
//         else if (xp == 550 && xp < 600) {
//             playerLevel = 11
//         }
//         else if (xp == 600 && xp < 650) {
//             playerLevel = 12
//         }
//         else if (xp == 650 && xp < 700) {
//             playerLevel = 13
//         }
//         else if (xp == 700 && xp < 750) {
//             playerLevel = 14
//         }
//         else if (xp >= 750) {
//             playerLevel = 15
//         }

//         return playerLevel;
//     } catch (error) {
//         return res.send({ responseCode: 400, responseMessage: "Something went wrong", responseResult: error.message })
//     }
// }





const playerModel = require("../model/playerModel")
const playerProfile = require("../model/playerProfile")
const carInventoryModel = require("../model/playerInventoryModel")
const jwt = require("jsonwebtoken")
const fs = require('fs');
const path = require('path');
const publicDirectory = path.join(__dirname, '../uploads');
const { validationResult } = require('express-validator');
const config = require("../config/config");
const { v4: uuidv4 } = require('uuid');

const handlebars = require("handlebars");
const uuid = require('uuid');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const express = require("express");
const viewPath = path.resolve(__dirname, '../views');

const handlebarOptions = {
    viewEngine: {
        extName: ".handlebars",
        // partialsDir: viewPath,
        layoutsDir: viewPath,
        defaultLayout: false,
        //   partialsDir: partialsPath,
        express,
    },
    viewPath: viewPath,
    extName: ".handlebars",
};
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,//587,
    secure: true, // true for 465, false for other ports
    auth: {
        user: config.emailUser,
        pass: config.emailPass,
    },
});

// registration is happening
exports.registration = async (req, res) => {
    try {
        const reqBody = req.body
        const { email, password, name } = reqBody

        if (!email || !password || !name) {
            return res.send({ responseCode: 200, success: false, responseMessage: "All fields are required" })
        }
        if (password.length < 6) {
            return res.send({ responseCode: 200, success: false, responseMessage: 'Password must be a maximum of 6 digits' })
        }
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.send({ responseCode: 200, success: false, responseMessage: "Invalid email" })

        const findEmail = await playerModel.findOne({ email: email });
        if (findEmail) {
            return res.send({ responseCode: 200, success: false, responseMessage: "This email already exits!" })
        }
        if (req.file) {
            const token = uuid.v4();

            const registration = await playerModel.create({
                email: email,
                password: password,
                profileImage: `${req.file.filename}`,
                name: name,
                code: token
            })

            const verificationtoken = uuidv4();
            const verificationURL = `http://192.168.29.149:3024/player/verify/email/?id=${verificationtoken}`;
            transporter.use('compile', hbs(handlebarOptions))

            let info = await transporter.sendMail({
                from: config.emailUser,
                to: email,
                subject: "Email Verification",
                template: 'emailVerifcationTemplate',
                context: {
                    verificationURL: verificationURL,
                    userName: email
                },
            });


            // let transporter = nodemailer.createTransport({
            //     service: 'gmail',
            //     host: 'smtp.gmail.com',
            //     port: 465,
            //     secure: false,
            //     requireTLS: true,
            //     auth: {
            //         user: config.emailUser,
            //         pass: config.emailPass,
            //     },
            // });

            // const mailOptions = {
            //     from: config.emailUser, // Sender's email address
            //     to: email,
            //     subject: 'Email Verification',
            //     text: `Click the following link to verify your email: http://192.168.29.149:3024/player/verify/email/?id=${token}`,
            //     // You can also use HTML for the email body:
            //     // html: '<h1>Hello, Nodemailer!</h1><p>This is an HTML email.</p>'
            // };

            // transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //         console.error('Error sending email:', error);
            //     } else {
            //         console.log('Email sent:', info.response);
            //     }
            // });

            return res.send({ responseCode: 200, success: true, responseMessage: "User registared successfully.Please check your mail.", responseResult: registration })
        }
        else {

            const registration = await playerModel.create({
                email: email,
                password: password,
                name: name,
                code: token
            })


            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: false,
                requireTLS: true,
                auth: {
                    user: config.emailUser,
                    pass: config.emailPass,
                },
            });

            const mailOptions = {
                from: config.emailUser, // Sender's email address
                to: email,
                subject: 'Email Verification',
                text: `Click the following link to verify your email: http://192.168.29.149:3024/player/verify/email/?id=${token}`,
                // You can also use HTML for the email body:
                // html: '<h1>Hello, Nodemailer!</h1><p>This is an HTML email.</p>'
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
            return res.send({ responseCode: 200, success: true, responseMessage: "User registared successfully", responseResult: registration })
        }
    }
    catch (error) {
        return res.send({ responseCode: 400, success: false, responseMessage: error.message })
    }
}


exports.verifyEmail = async (req, res) => {
    try {

        const verficationCode = req.query.id;
        const findUser = await playerModel.findOne({ code: verficationCode });
        if (!findUser) {
            res.render('alreadyVerified');

            // return res.send({ responseCode: 200, success: false, responseMessage: "This verfication link does not exist !" })
        } else {
            const updateUser = await playerModel.findOneAndUpdate({ _id: findUser._id },
                {
                    $set: {
                        code: "",
                        isVerify: true
                    }
                },
                { new: true });

            res.render('emailverification');
        }

        // return res.send({ responseCode: 200, success: true, responseMessage: "user verify !" })
    }

    catch (error) {
        return res.send({ responseCode: 400, success: false, responseMessage: error.message })
    }
}

//login is happening
exports.login = async (req, res) => {
    try {
        const reqBody = req.body
        const { email, status, password } = reqBody
        if (!email)
            return res.send({ responseCode: 200, success: false, responseMessage: "Email is required" })

        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.send({ responseCode: 200, success: false, responseMessage: "Invalid email" })

        const playerData = await playerModel.findOne({ email: email })
        if (!playerData) {
            return res.send({ responseCode: 200, status: false, responseMessage: "Email not exits" })
        }

        if (playerData.password != password) {
            return res.send({ responseCode: 200, status: false, responseMessage: "Incorrect password." })
        }
        else {
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
        const { name, email } = reqBody

        if (!name)
            return res.send({ responseCode: 200, success: false, responseMessage: "Name feild are required" })

        const player = await playerModel.findOne({ _id: id })
        if (!player) {
            return res.send({ responseCode: 200, success: false, responseMessage: "You are not a player!" })
        }
        const findPlayer = await playerProfile.findOne({ user_id: player.id })
        if (findPlayer != null) {

            if (req.file) {
                const playerProfileData = await playerProfile.findOneAndUpdate(
                    { user_id: player.id },
                    {
                        $set: {
                            user_id: id,
                            name: name,
                            email: player.email,
                            profileImage: `${req.file.filename}`
                        }
                    },
                    { new: true }
                )
                return res.send({ responseCode: 200, success: true, responseMessage: "Player profile update successffully", responseResult: playerProfileData })
            }
            const playerProfileData = await playerProfile.findOneAndUpdate(
                { user_id: player.id },
                {
                    $set: {
                        user_id: id,
                        name: name,
                        email: player.email,
                        // profileImage: `${req.file.filename}`
                    }
                },
                { new: true }

            )
            return res.send({ responseCode: 200, success: true, responseMessage: "Player profile update successffully", responseResult: playerProfileData })
        }
        else {

            if (req.file) {
                const createProfile = await playerProfile.create({
                    user_id: id,
                    name: name,
                    email: player.email,
                    profileImage: `${req.file.filename}`
                })
                return res.send({ responseCode: 200, success: true, responseMessage: "Profile created  successfully", responseResult: createProfile })
            }
            else {
                const createProfile = await playerProfile.create({
                    user_id: id,
                    name: name,
                    email: player.email,
                    // profileImage: `${req.file.filename}`
                })
                return res.send({ responseCode: 200, success: true, responseMessage: "Profile created  successfully", responseResult: createProfile })
            }
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


exports.forgotPassword = async (req, res) => {
    try {
        const reqBody = req.body
        const { email } = reqBody

        if (!email)
            return res.send({ responseCode: 200, success: false, responseMessage: "Field are required" })

        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.send({ responseCode: 200, success: false, responseMessage: "Invalid email" })

        const playerData = await playerModel.findOne({ email: email })
        if (!playerData) {
            return res.send({ responseCode: 200, status: false, responseMessage: "Email not exits" })
        }
        const verificationtoken = uuidv4();

        const updateResetCodeAdmin = await playerModel.findOneAndUpdate({ email: email },
            {
                $set: {
                    code: verificationtoken
                }
            }, { new: true })

        const verificationURL = `http://192.168.29.149:3024/player/reset/password?id=${verificationtoken}`;

        transporter.use('compile', hbs(handlebarOptions))

        let info = await transporter.sendMail({
            from: config.emailUser,
            to: email,
            subject: "Reset Password",
            template: 'resetpassword',
            context: {
                verificationURL: verificationURL,
                userName: email
            },
        });
        return res.send({ responseCode: 200, success: true, responseMessage: "Forgot password link sent successfully on your mail" })
    }
    catch (error) {
        return res.send({ responseCode: 400, success: false, responseMessage: error.message })
    }
}



exports.resetPassword = async (req, res) => {
    try {
        const code = req.query.id;

        const findUser = await playerModel.findOne({ code: code });

        if (findUser) {
            res.render('updatePassword');
        }
        else {
            res.send({ responseCode: 200, success: false, responseResult: "This link does not exist !" })
        }
    }
    catch (error) {
        return res.send({ responseCode: 400, responseMessage: error.message })

    }
}


exports.updatePassword = async (req, res) => {
    try {
        const reqBody = req.body;
        const { password, code } = reqBody;
        if (!password)
            return res.send({ responseCode: 200, success: false, responseMessage: "All feilds are required!" })

        const userdata = await playerModel.findOne({ code: code })

        if (userdata) {
            let userUpdate = await playerModel.findOneAndUpdate(
                { _id: userdata._id },
                {
                    $set: {
                        password: password,
                        code: ""
                    }
                },
                { new: true }
            )
            return res.send({ responseCode: 200, success: true, responseMessage: "Host password updated successfully", responseResult: userUpdate })
        }
        else {
            return res.send({ responseCode: 200, success: false, responseMessage: "Data in not found" })
        }
    }
    catch (error) {
        return res.send({ responseCode: 400, responseMessage: error.message })
    }
}














