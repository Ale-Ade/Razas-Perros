require('dotenv').config();
const { API, API_KEY } = process.env;
const { Temperamento } = require('../src/db');
const axios = require('axios');


const loadTemperamentos = async() => {
    var {data} = await axios.get(`${API}?api_key=${API_KEY}`)
    var temperamentos = []
    data.forEach(e => {
        if(typeof(e.Temperamento) === "string"){
            let res = e.Temperamento.split(",")
            res = res.map(e => e.trim())
            temperamentos = temperamentos.concat(res)
        }
    });
    temperamentos = Array.from(new Set(temperamentos)).sort() 
   // Set permite almacenar valores únicos de cualquier tipo
   // Array.from crea una nueva instancia de Array a partir de un objeto iterable
    for await (var temp of temperamentos) {
        Temperamento.create({nombre: temp})
    }
}

module.exports = loadTemperamentos;