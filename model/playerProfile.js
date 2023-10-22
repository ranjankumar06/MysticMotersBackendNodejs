const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerProfileSchema = new mongoose.Schema(
    {

        user_id: {
            type: Schema.Types.ObjectId,
            ref: "Player"
        },

        email: {
            type: String
        },

        name: {
            type: String
        },

        playerCoins: {
            type: Number,
            default: 0
        },

        playerExperience: {
            type: Number,
            default: 0
        },

        playerLevel: {
            type: Number,
            default: 0
        },

        profileImage: {
            type: String
        },
        // xp:{
        //     type:String
        // }

    },
    { timestamps: true }
);
module.exports = mongoose.model("playerProfile", playerProfileSchema);