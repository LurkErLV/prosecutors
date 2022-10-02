const router = require('express').Router();
const Order = require('../models/Order');
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;

router.get('/', (req, res) => {
    MongoClient.connect('mongodb://lurker:gaisma@46.101.142.29:27020/users', async (err, client) => {
        const db = client.db('users');
        const approved = await db.collection('orders').find({ status: "Активные" }).toArray();
        const archive = await db.collection('orders').find({ status: "Архив" }).toArray();
        const moderation = await db.collection('orders').find({ status: "Модерация" }).toArray();

        res.render('orders', {
            user: req.user,
            approved: approved,
            archive: archive,
            moderation: moderation
        });
    });
});

router.get('/create', (req, res) => {
    if (req.user) {
        if (req.user.level >= 4) {
            res.render('createOrder', {
                user: req.user
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
    res.render('createOrder', {
        user: req.user
    });
});

router.post('/create', bodyParser.urlencoded({ extended: true }), async (req, res) => {
    let result = null;
    try {
    result = new Order({
        name: req.body.name,
        surname: req.body.surname,
        gender: req.body.gender,
        race: req.body.race,
        birthplace: req.body.birthplace,
        birthdate: req.body.birthdate,
        height: req.body.height,
        weight: req.body.weight,
        eyeColor: req.body.eyeColor,
        hairColor: req.body.hairColor,
        wantedReason: req.body.wantedReason,
        issuedBy: req.body.issuedBy,
        orderId: req.body.orderId,
        issueDate: req.body.issueDate,
        validUntil: req.body.validUntil,
        additional: req.body.additional,
        isDanger: req.body.isDanger,
        imgUrl: req.body.imgUrl,
        code: req.body.code,
        status: "Модерация"
    }).save();
} catch (err) {
    console.log(err);
}
    setTimeout(function(){
        res.redirect('/orders');
    }, 200);
});

router.get('/:orderId', async (req, res) => {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (order) {
        if (order.status === "Активные") {
            res.render('order', {
                user: req.user,
                order: order
            });
        } else if (order.status === "Удалить") {
            order.remove((err) => {
                if (err) {
                    console.log(err);
                }
            });
            res.render('order', {
                user: req.user,
                order: order
            });
        } else {
        if (req.user) {
            if (req.user.level >= 4) {
                res.render('order', {
                    user: req.user,
                    order: order
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
    }
    } else {
        res.render('error', {
            user: req.user
        });
    }
});

router.post('/:orderId', async (req, res) => {
    const order = await Order.findOne({ orderId: req.params.orderId });
    order.updateOne({ status: req.body.status }, (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.redirect(req.get('referer'));
});

module.exports = router;
