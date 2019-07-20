const { Auth } = require("../../Util/Auth");
const { db } = require("../../Util/admin");
const express = require("express");
const router = express.Router();

//@route    POST /notifications
//@desc     Mark notifications as read
//@access   Protected
router.post('/', Auth, async (req, res) => {
    
})

module.exports = router;
