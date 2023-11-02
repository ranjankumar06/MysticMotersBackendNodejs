// const express = require("express");
// const playerController = require("../controller/playerController");
// const bodyParser = require("body-parser");
// const auth = require("../middleware/auth")
// const { body } = require('express-validator');

// const multer = require('multer');
// const router = express.Router();

// const path = require("path")

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../uploads'); // Set the destination folder for uploaded files
//     },
//     filename: function (req, file, cb) {
//         const extension = path.extname(file.originalname);
//         const fileName = Date.now() + extension;
//         cb(null, fileName); // Save the file with a unique name and original file extension
//     }
// });
// const upload = multer({ storage: storage })

// //Login or Registration
// router.post("/login", [body('email').isEmail().withMessage('Invalid email')], playerController.login)

// //Plyer profile_update and create
// router.post("/playerProfile", auth, upload.single("image"), [body('email').isEmail().withMessage('Invalid email')], playerController.playerProfile);

// //specific-profile
// router.get("/specific/profile", auth, playerController.specificProfile)

// //Player-inventory 
// router.post("/playerInventory", auth, playerController.carInventory)

// //specific-car-inventory
// router.get("/specific/carInventory", auth, playerController.specificCarInventory)

// // Player stats
// router.post("/playerStats", auth, playerController.playerStats)

// module.exports = router;


const express = require("express");
const playerController = require("../controller/playerController");
const bodyParser = require("body-parser");
const auth = require("../middleware/auth")
const { body } = require('express-validator');

const multer = require('multer');
const router = express.Router();

const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads'); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        const fileName = Date.now() + extension;
        cb(null, fileName); // Save the file with a unique name and original file extension
    }
});
const upload = multer({ storage: storage })

// Registration
router.post("/registration", upload.single("image"), [body('email').isEmail().withMessage('Invalid email')], playerController.registration)

router.get("/verify/email", playerController.verifyEmail);


//Login
router.post("/login", [body('email').isEmail().withMessage('Invalid email')], playerController.login)

//Plyer profile_update and create
router.post("/playerProfile", auth, upload.single("image"), playerController.playerProfile);

//specific-profile
router.get("/specific/profile", auth, playerController.specificProfile)

//Player-inventory 
router.post("/playerInventory", auth, playerController.carInventory)

//specific-car-inventory
router.get("/specific/carInventory", auth, playerController.specificCarInventory)

// Player stats
router.post("/playerStats", auth, playerController.playerStats)


router.post("/forgotPassword", [body('email').isEmail().withMessage('Invalid email')], playerController.forgotPassword)

router.get("/reset/password", playerController.resetPassword)
router.post("/reset/passwords", playerController.updatePassword)  


module.exports = router;
