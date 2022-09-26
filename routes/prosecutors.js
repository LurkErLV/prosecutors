const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('prosecutors', {
        user: req.user
    });
});

module.exports = router;