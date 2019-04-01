const express = require("express");
const router = express.Router();

const {list} = require( "../controllers/HueController");

router.get("/api/hue", list);


module.exports = router;