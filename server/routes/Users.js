const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");


//creacion usuario
router.post("/", async (req, res) => {
  const { email, password, nombre, apellido, edad, DNI, tipoRol, AreaTrabajoId } = req.body;
  console.log(req.body)
  bcrypt.hash(password, 10).then((hash) => {
    try{
      Users.create({
        email: email,
        password: hash,
        nombre,
        apellido,
        edad,
        DNI,
        tipoRol, 
        AreaTrabajoId
      });
    }
    catch(err){
      res.status(400).send('Datos erroneos');
    }
    res.json("SUCCESS");
  });
});


//login y validacion usuario
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong email And Password Combination" });

    const accessToken = sign(
      { email: user.email, id: user.id },
      "importantsecret"
    );
    res.json({ token: accessToken, email: email, id: user.id });
  });
});

//hacer get de usuarios

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;