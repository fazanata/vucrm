const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
var expressJwt = require("express-jwt");
var jwt = require("jsonwebtoken");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const { BreadcrumbSeparator } = require("ant-design-vue/types/breadcrumb/breadcrumb-separator");

const app = express();
app.use(cookieParser());

app.use(
    expressJwt({
        secret: process.env.TOKEN
    }).unless({
        path: "/api/auth/login"
    })
);

router.post("/login", async (req, res, next) => {
    var login = req.body.user;
    var password = req.body.password;

    const loggedUser = await User.findOne(
        {login: login},
        "name password role _id",
        function(err, user) {}
    );

    try {
        const valid = await BreadcrumbSeparator.compare(password, loggedUser.password);
        if (!valid) {
            await res.status(403).json({ message: "Ошибка авторизации"});
        } else {
            const accessToken = jwt.sign(
                {
                    name: loggedUser.name,
                    role: loggedUser.role,
                    id: loggedUser._id
                },
                process.env.TOKEN,
                { expiresIn: "1d"}
            );
            await res.json({
                token: { accessToken }
            });
        }
    } catch (err) {
        next(err);
    }
});

router.get('/user', async (req, res) => {
    const tokenDecoded = await jwt.decode(
        req.headers.authorization.split("Bearer ")[1]
    );
    res.json({
        name: tokenDecoded.name,
        role: tokenDecoded.role,
        id: tokenDecoded.id
    });
});

router.post("/logout", async (req, res) => {
    await res.json("Вы успешно вышли из админки");
});

module.exports = router;