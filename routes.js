function registeredRoutes(app) {
  app.get('/', async(req, res) => {
    return res.json({msg: "API HIT"})
  })
  app.use('/api/backend', require('./src/api/controller'))
}

module.exports = {
  registeredRoutes
}