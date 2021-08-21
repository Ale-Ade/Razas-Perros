const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { Raza, Temperamento } = require("../db.js")
require("dotenv").config();
const { API_KEY, API } = process.env;
const { Sequelize, Op } = require("sequelize");
const axios = require("axios");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req, res, next) => {
    const { nombre } = req.query;
    if (!nombre) {
      try {
        var database = await Raza.findAll({
          include: {
            model: Temperamento,
              attributes: {
                include: ['nombre'], 
                exclude:['createdAt', 'updatedAt']
              },
              through: {
                attributes:[]
              }
          }
        })
        const api = await axios.get(`${API}?api_key=${API_KEY}`)
        Promise.all([database, api])
          .then((results) => {
            const [databased, apiData] = results;
            const response = databased.concat(apiData.data)
            res.send(response);
          })
      } catch (error) {
        next(error)
        res.send(error.message)
      }
    } else {
      try {
        var database = await Raza.findAll({
          include: {
            model: Temperamento,
              attributes: {
                include: ['nombre'], 
              },
              through: {
                attributes:[]
              }
          }
        })
  
        const api = await axios.get(`${API}?api_key=${API_KEY}`)
        let razas = await Promise.all([database, api])
          .then((results) => {
            const [databased, apiData] = results;
            const response = databased.concat(apiData.data)
            return response;
          })
        let resultado = []
        for (let i = 0; i<razas.length;i++){
          if(razas[i].nombre.includes(nombre)){
           resultado.push(razas[i])
          }}
        res.send(resultado).status(200)       
  
      } catch (error) {
        next(error)
        console.log(error)
        res.send({error:"Dog does not exist"}).status(404)
      }
    }
  
  })

router.get("/:id", async (req, res, next) => {
    const {id} = req.params;
    if (id.length < 15) {
        try {
            const perritos = await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
            res.json(perritos.data.find(Raza => Raza.id === parseInt(id)))
        } catch (error) {
            next(error)
        }
        
    } else {
        try {
            Raza.findAll({ 
                where: {id: id},
                include: {
                    model: Temperamento,
                    attributes: ["nombre"],
                    through: {
                        attributes: []
                    }
                }
            })
            .then(resp => res.send(resp))
        
        } catch (error) {
            next(error)
        }
    }
})

module.exports = router;