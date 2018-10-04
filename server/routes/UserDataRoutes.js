const express = require("express");
const router = express.Router();


//****************REPLACE ALL OCCURENCES OF "FOO" & "FOOS" */
const {list,show,create,update} = require( "../controllers/UserDataController");



// router.get("/api/datas", list);
router.get("/api/data/:userName", show);
router.post("/api/data", create);
router.put("/api/data/:userName", update);
// router.delete("/api/data/:id", remove);

module.exports = router;