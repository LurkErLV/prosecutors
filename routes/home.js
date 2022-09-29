const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;

router.get('/', (req, res) => {
    MongoClient.connect('mongodb://lurker:gaisma@46.101.142.29:27020/users', async (err, client) => {
        if (err) throw err;
        const db = client.db('users');

    res.render('home', {
        user: req.user,
        news: await (await db.collection('news').find().toArray()).reverse()
    });
});
});

module.exports = router;