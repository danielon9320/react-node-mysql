const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { AreaTrabajos } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const { Tareas } = require("../models/Tareas");

//creacion usuario
router.post("/", async (req, res) => {
  const {
    email,
    password,
    nombre,
    apellido,
    edad,
    DNI,
    tipoRol,
    AreaTrabajoId,
  } = req.body;
  console.log(req.body);
  bcrypt.hash(password, 10).then((hash) => {
    try {
      Users.create({
        email: email,
        password: hash,
        nombre,
        apellido,
        edad,
        DNI,
        tipoRol,
        AreaTrabajoId,
      });
    } catch (err) {
      res.status(400).send("Datos erroneos");
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

//hacer get de todos los usuarios con su respectiva area
router.get("/all", async (req, res) => {
  const listOfUsers = await Users.findAll();
  const searchUser = await Promise.all(
    listOfUsers.map(async (user) => {
      const area = await AreaTrabajos.findOne({
        where: { id: user.AreaTrabajoId },
      });
      console.log("gol", area);
      const nombreArea = area?.dataValues.nombre;
      //console.log(user);
      delete user.dataValues.AreaTrabajoId;
      return { ...user.dataValues, nombreArea };
    })
  );
  //console.log(searchUser);
  res.json(searchUser);
});

//hacer get de jefes en sus areas para poder mostrar el detalle en la vista
router.get("/jefes", async (req, res) => {
  const listOfBoss = await Users.findAll({ where: { tipoRol: "jefe" } });
  const searchBoss = await Promise.all(
    listOfBoss.map(async (boss) => {
      //console.log(boss.dataValues)
      const area = await AreaTrabajos.findOne({
        where: { id: boss.dataValues.AreaTrabajoId },
      });
      const { nombre: nombreArea } = area.dataValues;
      const listOfEmployees = await Users.findAll({
        where: {
          tipoRol: "empleado",
          AreaTrabajoId: boss.dataValues.AreaTrabajoId,
        },
      });
      //console.log(listOfEmployees[0].dataValues);
      const listOfEmployeesFilter = await listOfEmployees.map((employee) => {
        return employee.dataValues.nombre;
      });

      //traer tareas

      return {
        ...boss.dataValues,
        nombreArea,
        empleados: listOfEmployeesFilter,
      };
    })
  );

  res.json(searchBoss);
});

//traer  por dni

router.get("/dni/:dniUser", async (req, res) => {
  const dniUser = req.params.dniUser;
  const userByDni = await Users.findOne({ where: { DNI: dniUser } });
  res.json(userByDni);
});

//traer empleado por apellido

router.get("/apellido/:apellidoUser", async (req, res) => {
  const apellidoUser = req.params.apellidoUser;

  const userBySurname = await Users.findAll({
    where: { apellido: "Empleadssasso apellido5" },
  });

  res.json(userBySurname);
});

//baja usuario

router.delete("/delete", async (req, res) => {
  const idUser = req.body.id;

  await Users.destroy({
    where: {
      id: idUser,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

//modificacion usuario

router.put("/update", async (req, res) => {
  const usuario = req.body;
  Users.update(
    { ...usuario },
    {
      where: {
        id: usuario.id,
      },
    }
  );

  res.json("Actualizado con exito");
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
