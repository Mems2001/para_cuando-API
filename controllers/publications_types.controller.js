const PublicationsTypesService = require('../services/publications_types.service')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const publicationsTypesService = new PublicationsTypesService()

const getPublicationsTypes = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let publicationsTypes = await publicationsTypesService.findAndCount(query)
    const results = getPagingData(publicationsTypes, page, limit)
    return response.json({ results: results })
  } catch (error) {
    next(error)
  }
}

const addPublicationType = async (request, response, next) => {
  try {
    let { body } = request
    let publicationType = await publicationsTypesService.createPublicationType(
      body
    )
    return response.status(201).json({ results: publicationType })
  } catch (error) {
    next(
      response.status(400).json({
        message: error.message,
        fields: {
          name: 'String',
          description: 'String',
        },
      })
    )
  }
}

const getPublicationType = async (request, response, next) => {
  try {
    let { id } = request.params
    let publicationType =
      await publicationsTypesService.getPublicationTypeOr404(id)
    return response.json({ results: publicationType })
  } catch (error) {
    next(error)
  }
}

const updatePublicationType = async (request, response, next) => {
  try {
    let { id } = request.params
    let { body } = request
    let publicationType = await publicationsTypesService.updatePublicationType(
      id,
      body
    )
    return response.json({ results: publicationType })
  } catch (error) {
    next(error)
  }
}

const removePublicationType = async (request, response, next) => {
  try {
    let { id } = request.params
    let publicationType = await publicationsTypesService.removePublicationType(
      id
    )
    return response.json({ results: publicationType, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getPublicationsTypes,
  addPublicationType,
  getPublicationType,
  updatePublicationType,
  removePublicationType,
}
