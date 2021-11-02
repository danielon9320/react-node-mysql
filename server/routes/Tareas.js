const express = require("express");
const router = express.Router();
const { Tareas } = require("../models");
const { Users } = require("../models");

router.post("/crearTarea", async (req, res) => {
  console.log(req.body)
  const { nombre, descripcion } = req.body;
  try {
    Tareas.create({
      nombre,
      descripcion,
    });
  } catch (err) {
    res.status(400).send("Datos erroneos");
  }
  res.json("SUCCESS");
});

router.get("/verTareas", async (req, res) => {
  const listOfTareas = await Tareas.findAll();
  res.json(listOfTareas);
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const userData = await Users.findAll( { where: { id: userId }});
  const tareas = await Tareas.findAll({ where: { UserId: userId } });
  res.json({ userData , tareas});
});



module.exports = router;
