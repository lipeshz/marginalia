const errorMap = require('./error.map')

const responseErrorController = (res, result) => {
    const { statusCode, message } = errorMap(result.error)
    return res.status(statusCode).json({
        success: false,
        message,
        ...(result.labels && { labels: result.labels })
    })
}

module.exports = responseErrorController