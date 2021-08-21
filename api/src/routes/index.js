const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeraza = require("./razas");
const routeTemperamentos = require("./temperamento");
const routerazas = require("./raza");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/raza", routeraza);
router.use("/temperamento", routeTemperamentos);
router.use("/razas", routerazas);

module.exports = router;
