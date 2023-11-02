const mongoose = require("mongoose");

const payerSchema = new mongoose.Schema(
    {

        email: {
            type: String
        },
        password: {
            type: String
        },
        status: {
            type: String,
            enum: ["Google", "Normal"],
            default: "Normal"
        },
        name: {
            type: String
        },
        profileImage: {
            type: String
        },
        isVerify: {
            type: Boolean,
            default: false
        },
        code:{
            type:String
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Player", payerSchema);