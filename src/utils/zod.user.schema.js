const zod = require('zod')

const nameHasSpecialChar = /[^a-zA-Z0-9]/
const passwordRegex = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/

const userRegisterSchema = zod.object({
    name: 
        zod.string('Invalid name format.')
        .trim()
        .min(5, 'Name must be at least 5 characters.')
        .max(50, 'Name must be at most 50 characters.')
        .refine((value) => !nameHasSpecialChar.test(value), { message: 'The name cannot have special characters.'}),

    email: 
        zod.string('The e-mail can not be empty.')
        .trim()
        .email('Invalid e-mail format.'),

    password: 
        zod.string('The password can not be empty.')
        .trim()
        .refine((value) => passwordRegex.test(value), { message: 'Invalid password. It must have at least 6 characters, one upper case letter and one special character.'}),
    
    conf_password:
        zod.string('The password can not be empty.')
        .trim()
}).refine(({ password, conf_password}) => password === conf_password, {
    message: 'Password do not match.',
    path: ['conf_password']
})

const userLoginSchema = zod.object({
    email:
        zod.string('Invalid e-mail format.').trim(),
    
    password:
        zod.string('Invalid password format.').trim()
})

module.exports = { userRegisterSchema, userLoginSchema }