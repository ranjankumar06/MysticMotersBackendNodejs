const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerInventorySchema = new mongoose.Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "Player"
        },
        carInventory: {
            colour: {
                type: String
            },
            car: {
                type: String
            },
            buy: {
                type: String
            }
        },
        powerups: [{
            Spells: {
                spells1: {
                    type: String
                },
                spells2: {
                    type: String
                },
                spells3: {
                    type: String
                },
                spells4: {
                    type: String
                }
            },
            boostpower: {
                type: String
            }
        }]
    },
    { timestamps: true }
);
module.exports = mongoose.model("playerInventory", playerInventorySchema);