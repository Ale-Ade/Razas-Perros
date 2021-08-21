const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { raza } = require("../db.js")
require("dotenv").config();
const { Sequelize, UUID } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

router.post("/", async (req, res, next) => {
    const{
        nombre,
        altura,
        peso,
        vida,
        temperamentos}= req.body; 
        
    console.log(temperamentos)
    try {
        let id = uuidv4()
        createNewraza = await raza.create({nombre, altura, peso, vida, id})
        await createNewraza.setTemperamentos(temperamentos)
    } catch (error) {
        next(error)
    }
})

module.exports = router;