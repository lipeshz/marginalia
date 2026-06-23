const schemaValidator = (data, schema) => {
    let errors = {}
    for(const key in data){
        const rule = schema[key]
        const value = data[key]
        if(!rule) continue

        const failedRule = rule.find(field => field.test(value, data))

        if(failedRule) errors[key] = failedRule.message
    }

    return errors
}

module.exports = schemaValidator