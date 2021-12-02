const express = require("express");
const router = express.Router();
const { Tareas } = require("../models");
const { Users } = require("../models");

router.post("/crearTarea", async (req, res) => {
  console.log(req.body);
  const {

    nombre,
    descripcion,
    estado,
    AreaTrabajoId,
    fechaParaRealizar,
    UserId,
  } = req.body;
  //const fecha = new Date(fechaParaRealizar)
  try {
    Tareas.create({
      nombre,
      descripcion,
      estado,
      AreaTrabajoId,
      fechaParaRealizar,
      UserId,
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
  const listOfTareas = await Tareas.findAll({
    where: { AreaTrabajoId: areastrabajoId },
  });
  res.json(listOfTareas);
});

//tareas diarias
router.get("/asignment", async (req, res) => {
  //debemos recibir una fecha desde el front para poder ajustar la comparacion. La variable se llama fechaParaRealizar.
  const actualDateBegin = new Date().setHours(0, 0, 0, 0);
  console.log(actualDateBegin);
  const actualDateEnd = new Date().setHours(23, 59, 59, 999);
  console.log(actualDateEnd);
  const tareas = await Tareas.findAll();
  const tareasDia = await Promise.all( tareas.map(async(tarea) => {
   
    const {nombre: nombreUsuario, apellido} = await Users.findOne({where:{id:tarea.UserId}})
    const fechaTarea = new Date(tarea.dataValues.fechaParaRealizar).valueOf();
    console.log("HOLA", fechaTarea);
    
    if (fechaTarea >= actualDateBegin && fechaTarea <= actualDateEnd) {
      //falta comparar con la fecha q se asigna para realizar 
      
      return { ...tarea.dataValues, nombreUsuario, apellido};
    }
  }));
  const tareaDiaFiltrada = tareasDia.filter((tarea) => {
    return tarea != undefined;
  });
   //console.log(tareas);
  //console.log(tareaDiaFiltrada);
  res.json(tareaDiaFiltrada);
});

//ver tareas por usuario
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const userData = await Users.findAll({ where: { id: userId } });
  const tareas = await Tareas.findAll({ where: { UserId: userId } });
  res.json({ userData, tareas });
});

router.get("/prueba", async (req, res) => {
  console.log("probando");
});

module.exports = router;
