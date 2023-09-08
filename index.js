const express = require('express')
const app = express()
const port = 3000

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors())

const {validateUser} = require('./schemas/user')
const {validateChara} = require('./schemas/character')
const {validateItem} = require('./schemas/item')

let users = []
let charas = []
let items = []

users.push({
    id: 1006106410,
    name: "Sebastian",
    last: "Romero",
    email: "nakosume@gmail.com"
})

charas.push({
    id: 1006106104,
    name: "Zenith",
    level: 64,
    class: "Paladin",
    userId: 1006106410
})

items.push({
    id: 540,
    name: "Oathkeeper",
    type: "Espada",
    mode: "Defensa",
    charaId: 1006106104
})

//////////////////////////////
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})

app.get('/', (req, res) => {
    res.send('MMO API IS RUNNING')
})

//////////////////////////////
//users
app.get('/users', (req, res) => {
    res.send({ "users": users })
})

app.post('/users',(req,res)=>{
    const userValidationResult = validateUser(req.body)
    console.log("result", userValidationResult.error)

    if (userValidationResult.error) {
        return res.status(400).send(
            { message: JSON.parse(userValidationResult.error.message) }
        )
    }

    let newUser={
        id:userValidationResult.data.id,
        name:userValidationResult.data.name,
        last:userValidationResult.data.last,
        email:userValidationResult.data.email,
    }

    users.push(newUser)
    res.status(201).send({ "message": "New User!", "user": newUser })
})

app.put('/users/:id',(req, res)=>{
    let index = users.findIndex(user => user.id == req.params.id)

    const userValidationResult = validateUser(req.body)
    console.log("result", userValidationResult.error)

    if (userValidationResult.error) {
        return res.status(400).send(
            { message: JSON.parse(userValidationResult.error.message) }
        )
    }
    
    let newUser={
        id:userValidationResult.data.id,
        name:userValidationResult.data.name,
        last:userValidationResult.data.last,
        email:userValidationResult.data.email,
    }
    users[index]=newUser
    res.send("User Updated" + newUser)
})

app.delete('/users/:id', (req, res)=>{
    const idToDelete = req.params.id;
    let indexToDelete = users.findIndex(user=>user.id==idToDelete)
    let userDeleted = users.splice(indexToDelete, 1)
    res.send("User Deleted: " + userDeleted[0].id)
})

//////////////////////////////
//characters
app.get('/charas', (req, res) => {
    res.send({ "characters": charas })
})

app.post('/charas',(req,res)=>{
    const charaValidationResult = validateChara(req.body)
    console.log("result", charaValidationResult.error)

    if (charaValidationResult.error) {
        return res.status(400).send(
            { message: JSON.parse(charaValidationResult.error.message) }
        )
    }

    let newChara={
        id:charaValidationResult.data.id,
        name:charaValidationResult.data.name,
        level:charaValidationResult.data.level,
        class:charaValidationResult.data.class,
        userId:charaValidationResult.data.userId,
    }

    charas.push(newChara)
    res.status(201).send({ "message": "New Character!", "Character": newChara })
})

app.put('/charas/:id',(req, res)=>{
    let index = charas.findIndex(chara => chara.id == req.params.id)

    const charaValidationResult = validateChara(req.body)
    console.log("result", charaValidationResult.error)

    if (charaValidationResult.error) {
        return res.status(400).send(
            { message: JSON.parse(charaValidationResult.error.message) }
        )
    }
    
    let newChara={
        id:charaValidationResult.data.id,
        name:charaValidationResult.data.name,
        level:charaValidationResult.data.level,
        class:charaValidationResult.data.class,
        userId:charaValidationResult.data.userId,
    }
    charas[index]=newChara
    res.send("Character Updated" + newChara)
})

app.delete('/charas/:id', (req, res)=>{
    const idToDelete = req.params.id;
    let indexToDelete = charas.findIndex(chara=>chara.id==idToDelete)
    let charaDeleted = charas.splice(indexToDelete, 1)
    res.send("Character Deleted: " + charaDeleted[0].id)
})

//////////////////////////////
//items
app.get('/items', (req, res) => {
    res.send({ "items": items })
})

app.post('/items',(req,res)=>{
    const itemValidationResult = validateItem(req.body)
    console.log("result", itemValidationResult.error)

    if (itemValidationResult.error) {
        return res.status(400).send(
            { message: JSON.parse(itemValidationResult.error.message) }
        )
    }

    let newItem={
        id:itemValidationResult.data.id,
        name:itemValidationResult.data.name,
        type:itemValidationResult.data.type,
        mode:itemValidationResult.data.mode,
        charaId:itemValidationResult.data.charaId,
    }

    items.push(newItem)
    res.status(201).send({ "message": "New Item!", "Item": newItem })
})

app.put('/items/:id',(req, res)=>{
    let index = items.findIndex(item => item.id == req.params.id)

    const itemValidationResult = validateItem(req.body)
    console.log("result", itemValidationResult.error)

    if (itemValidationResult.error) {
        return res.status(400).send(
            { message: JSON.parse(itemValidationResult.error.message) }
        )
    }
    
    let newItem={
        id:itemValidationResult.data.id,
        name:itemValidationResult.data.name,
        type:itemValidationResult.data.type,
        mode:itemValidationResult.data.mode,
        charaId:itemValidationResult.data.charaId,
    }
    items[index]=newItem
    res.send("Item Updated" + newItem)
})

app.delete('/items/:id', (req, res)=>{
    const idToDelete = req.params.id;
    let indexToDelete = items.findIndex(item=>item.id==idToDelete)
    let itemDeleted = items.splice(indexToDelete, 1)
    res.send("Item Deleted: " + itemDeleted[0].id)
})