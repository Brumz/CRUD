const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json())

var ops = [{
    id: 1,
    name: "Ash"
}, {
    id: 2,
    name: "Thermite"
}, {
    id: 3,
    name: "Sledge"
}, {
    id: 4,
    name: "Bandit"
}, {
    id: 5,
    name: "Smoke"
}, {
    id: 6,
    name: "Doc"
}]

app.get('/', (req, res, next) => {
    res.send({
        ops
    })
})

app.get('/:id', (req, res, next) => {
    var {
        id
    } = req.params
    var filtered = ops.filter(op => {
        return op.id == id
    })
    res.send({
        ops: filtered
    })
})

app.post('/', (req, res) => {
    var {
        body
    } = req
    var op = {
        id: ops.length + 1,
        name: body.name
    }
    ops.push(op)
    res.send({
        ops: op
    })
})

app.put('/:id', (req, res) => {
    var {
        body
    } = req
    var {
        id
    } = req.params
    var mapped = ops.map(op => {
        if (id == op.id) {
            return op = {
                id: op.id,
                ...body
            }
        }
        return op
    })
    ops = mapped
    res.send({
        ops
    })
})

app.delete('/:id', (req, res) => {
    var {
        id
    } = req.params
    var filtered = ops.filter(op => {
        return op.id != id
    })
    ops = filtered
    res.send({
        ops
    })
})




app.listen(port)