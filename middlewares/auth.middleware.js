const UsersServices = require('../services/users.service')
const UsersService = new UsersServices()
const { jwtSecret } = require('../database/config/config').api
require('dotenv').config()

//? Passport maneja estrategias para las diferentes autenticaciones
const JwtStrategy = require('passport-jwt').Strategy
//? Extrae los header de la peticion
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')

//? Exportando funcion anonima
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: jwtSecret
}
passport.use(
  new JwtStrategy(options, async (decoded, done) => {
    //? done(error, decoded)
    try {
      const response = await UsersService.getUser(decoded.id)
      console.log(response)
      if (response) {
        return done(null, decoded) // No existe un error, pero si existe usuario
      }
      console.log('decoded JWT', decoded) // Mostramos la informacion del usuario loggeado en consola
      return done(null, false) // No existe error, No existe el usuario
    } catch (error) {
      return done(error, false) // Existe un error, No existe el usuario
    }
  })
)

module.exports = passport