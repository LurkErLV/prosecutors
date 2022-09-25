const router = require('express').Router();

router.get('*', (req, res) => {
    res.render('error', {
        user: req.user
    });
});

module.exports = router;