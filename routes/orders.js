const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('orders', {
        user: req.user
    });
});

router.get('/:orderId', (req, res) => {
    res.render('order', {
        user: req.user,
        order: req.params
    });
});

module.exports = router;