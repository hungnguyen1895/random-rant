const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
   res.send("hello world");
});

module.exports = router;
