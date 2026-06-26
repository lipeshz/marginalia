const removeUndefinedFields = (data) => {
    let filteredData = {}
    for(const key in data){
        if(data[key] !== '' && data[key] !== null && data[key] !== undefined) filteredData[key] = data[key].trim()
    }
    return filteredData
}

module.exports = removeUndefinedFields