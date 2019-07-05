const express = require('express');
const router = express.Router();

//@route    POST api/users
//@desc     Register User
//@access   Public

router.get('/', (req, res)=> res.json({ msg: "users success" }))

module.exports = router;