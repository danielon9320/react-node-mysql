const express = require("express");
const router = express.Router();
const { Tareas } = require("../models");
const { Users } = require("../models");

router.post("/crearTarea", async (req, res) => {
  console.log(req.body)
  const { nombre, descripcion, estado, AreaTrabajoId, UserId } = req.body;
  try {
    Tareas.create({
      nombre,
      descripcion,
      estado,
      AreaTrabajoId,
      UserId
    });
  } catch (err) {
    res.status(400).send("Datos erroneos");
  }
  res.json("SUCCESS");
});


//ruta para actualizar estado de la tarea 
/*router.put("/actualizarTareas/:id", async (req, res, next) => {
  Tareas.update(
    {estado: true},
    {where: req.params.id}
  )
  .then(function(rowsUpdated) {
    res.json(rowsUpdated)
  })
  .catch(next)
 })
*/
//ver todas las tareas
router.get("/verTareas", async (req, res) => {
  const listOfTareas = await Tareas.findAll();
  res.json(listOfTareas);
});



//ver tareas por area
router.get("/verTareasAreas/:areastrabajoId", async (req, res) => {
  const areastrabajoId = req.params.areastrabajoId;
  const listOfTareas = await Tareas.findAll( { where: { AreaTrabajoId: areastrabajoId}} );
  res.json(listOfTareas);
});

//ver tareas por usuario
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const userData = await Users.findAll( { where: { id: userId }});
  const tareas = await Tareas.findAll({ where: { UserId: userId } });
  res.json({ userData , tareas});
});



module.exports = router;
