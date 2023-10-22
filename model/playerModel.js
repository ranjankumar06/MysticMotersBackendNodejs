const mongoose = require("mongoose");

const payerSchema = new mongoose.Schema(
    {

        email: {
            type: String
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Player", payerSchema);