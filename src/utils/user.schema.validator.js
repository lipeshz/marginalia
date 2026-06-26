

const userSchemaValidator = {
    name: [
        { test: (val) => val === "" || val === null || val === undefined || typeof(val) !== "string", message: "The name can not be empty. " },
        { test: (val) => val.length < 5 && val.length > 50, message: "The name must have at least 5 characters and at most 25 characters." },
        { test: (val) => nameHasSpecialChar.test(val), message: "The name can not have special characters." }
    ],
    email: [
        { test: (val) => val === "" || val === null || val === undefined || typeof(val) !== "string", message: "The e-mail can not be empty. " },
        { test: (val) => !emailRegex.test(val), message: "Invalid e-mail. Example: example@example.example." }
    ],
    password: [
        { test: (val) => val === "" || val === null || val === undefined || typeof(val) !== "string", message: "The password can not be empty. " },
        { test: (val) => !passwordRegex.test(val), message: "Invalid password. It must have at least 6 characters, one upper case letter and one special character." },
        { test: (val, data) => val !== data.conf_password, message: "The password doesn't match." }
    ]
}

module.exports = userSchemaValidator