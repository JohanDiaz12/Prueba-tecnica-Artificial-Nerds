const app = require('./app')

const PORT = 3000

app.listen(PORT, () => {
  console.log(`El server está corriendo en el puerto ${PORT}`)
})
