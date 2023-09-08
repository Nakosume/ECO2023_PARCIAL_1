const z = require('zod')

const itemSchema = z.object({
    id: z.number({
        invalid_type_error: 'Item Id must be a Number',
        required_error: 'Item Id is required'
    }).int(),
    name: z.string({
        invalid_type_error: 'Item Name must be a String',
        required_error: 'Item Name is required'
    }),
    type: z.string({
        invalid_type_error: 'Item type must be a String',
        required_error: 'Item type is required'
    }),
    mode: z.string({
        invalid_type_error: 'Item mode must be a String',
        required_error: 'Item mode is required'
    }),
    charaId: z.number({
        invalid_type_error: 'Character Id must be a Number',
        required_error: 'Character Id is required'
    }).int()
})

function validateItem(obj) {
    return itemSchema.safeParse(obj); // safeParse vs parse
}

module.exports = {
    validateItem
}