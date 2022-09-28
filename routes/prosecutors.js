const router = require('express').Router();
const prosecutor = require('../models/prosecutor');
const MongoClient = require('mongodb').MongoClient;

router.get('/', (req, res) => {
    MongoClient.connect('mongodb://lurker:gaisma@46.101.142.29:27020/users', async (err, client) => {
        if (err) throw err;
        const db = client.db('users');

        const prosecutorsLS = await db.collection('prosecutors').find({ county: "Los-Santos" }).toArray();
        const prosecutorsBC = await db.collection('prosecutors').find({ county: "Blaine County" }).toArray();
        const genProsecutor = await db.collection('prosecutors').findOne({ county: "Federal" });

        res.render('prosecutors', {
            user: req.user,
            bc: prosecutorsBC,
            ls: prosecutorsLS,
            federal: genProsecutor
        });
    });
});

router.get('/edit', (req, res) => {
    if (req.user) {
        if (req.user.level >= 4) {
    MongoClient.connect('mongodb://lurker:gaisma@46.101.142.29:27020/users', async (err, client) => {
        if (err) throw err;
        const db = client.db('users');

        const prosecutorsLS = await db.collection('prosecutors').find({ county: "Los-Santos" }).toArray();
        const prosecutorsBC = await db.collection('prosecutors').find({ county: "Blaine County" }).toArray();
        const genProsecutor = await db.collection('prosecutors').findOne({ county: "Federal" });

        res.render('editProsecutors', {
            user: req.user,
            bc: prosecutorsBC,
            ls: prosecutorsLS,
            federal: genProsecutor
        });
    });
} else {
    res.render('error', {
        user: req.user
    });
}
} else {
    res.render('error', {
        user: req.user
    });
}
});

router.post('/edit', async (req, res) => {
    const target = await prosecutor.findOne({ _id: req.body.id });
    target.updateOne({ name: req.body.name, surname: req.body.surname, info: req.body.info, imgUrl: req.body.imgUrl}, (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.redirect(req.get('referer'));
});

module.exports = router;