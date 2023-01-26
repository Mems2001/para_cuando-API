const profilesServices = require('../services/profiles.service')
const profilesService = new profilesServices()

const roleMiddleware = async(req , res , next) => {
  try {
    const admin = await profilesService.verifyAdmin(req.user.id)
    // console.log(admin)

    if (admin) {
      next()
    } else {
      res.status(401).json({
        message: 'Permission denied'
      })
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

module.exports = {
  roleMiddleware
}