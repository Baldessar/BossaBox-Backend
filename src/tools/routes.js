const express = require("express")
const router = express.Router();

router.get("/tools",(req,res) => {
	res.end()
})

module.exports = router