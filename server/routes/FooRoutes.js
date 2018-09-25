const express = require("express");
const router = express.Router();


//****************REPLACE ALL OCCURENCES OF "FOO" & "FOOS" */
const {list,show,create,remove} = require( "../controllers/FooController");



router.get("/foos", list);
router.get("/foo/:id", show);
router.post("/foo", create);
router.put("/foo/:id", update);
router.delete("/foo/:id", remove);

module.exports = router;