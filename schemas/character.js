const z = require('zod')

const charaSchema = z.object({
    id: z.number({
        invalid_type_error: 'Character Id must be a Number',
        required_error: 'Character Id is required'
    }).int(),
    name: z.string({
        invalid_type_error: 'Character Name must be a String',
        required_error: 'Character Name is required'
    }),
    level: z.number({
        invalid_type_error: 'Character Level must be a Number',
        required_error: 'Character Level is required'
    }).int(),
    class: z.string({
        invalid_type_error: 'Character class must be a String',
        required_error: 'Character class is required'
    }),
    userId: z.number({
        invalid_type_error: 'User Id must be a Number',
        required_error: 'User Id is required'
    }).int()
})

function validateChara(obj) {
    return charaSchema.safeParse(obj); // safeParse vs parse
}

module.exports = {
    validateChara
}