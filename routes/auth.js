const expres = require('express');
const router = expres.Router();


router.post('/signup', (req,res) => {
    res.send("Hit, End point for signing Up.")
})


module.exports = router;