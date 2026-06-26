const errorMap = require('./error.map')

const getStatusCode = (label) => {
    return errorMap(label)
}

module.exports = getStatusCode