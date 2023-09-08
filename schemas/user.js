const z = require('zod')

const userSchema = z.object({
    id: z.number({
        invalid_type_error: 'User Id must be a Number',
        required_error: 'User Id is required'
    }).int(),
    name: z.string({
        invalid_type_error: 'User Name must be a String',
        required_error: 'User Name is required'
    }),
    last: z.string({
        invalid_type_error: 'User Last Name must be a String',
        required_error: 'User Last Name is required'
    }),
    email: z.string({
        invalid_type_error: 'User Email must be a String',
        required_error: 'User Email is required'
    }).email(),
})

function validateUser(obj) {
    return userSchema.safeParse(obj); // safeParse vs parse
}

module.exports = {
    validateUser
}