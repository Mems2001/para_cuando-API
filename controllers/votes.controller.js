const VotesService = require('../services/votes.service')
const PublicationsService = require('../services/publications.service')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const votesService = new VotesService()
const publicationsService = new PublicationsService()

const getVotes = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let votes = await votesService.findAndCount(query)
    const results = getPagingData(votes, page, limit)
    return response.json({ results: results })
  } catch (error) {
    next(error)
  }
}

const addVote = async (request, response, next) => {
  try {
    let { body } = request
    let vote = await votesService.createVote(body)
    return response.status(201).json({ results: vote })
  } catch (error) {
    next(
      response.status(400).json({
        message: error.message,
        fields: {
          publication_id: 'String',
          profile_id: 'String',
        },
      })
    )
  }
}

const getVote = async (request, response, next) => {
  try {
    let { id } = request.params
    let votes = await votesService.getVoteOr404(id)
    return response.json({ results: votes })
  } catch (error) {
    next(error)
  }
}

const updateVote = async (request, response, next) => {
  try {
    let { id } = request.params
    let { body } = request
    let vote = await votesService.updateVote(id, body)
    return response.json({ results: vote })
  } catch (error) {
    next(error)
  }
}

const removeVote = async (request, response, next) => {
  try {
    let { id } = request.params
    let vote = await votesService.removeVote(id)
    return response.json({ results: vote, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

const publicationByVote = async (request, response, next) => {
  const publicationId = request.publication_id
  const { voteId } = request.params
  const aux = await publicationsService.createPublication
}

module.exports = {
  getVotes,
  addVote,
  getVote,
  updateVote,
  removeVote,
}
