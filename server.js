var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Produto = require('./app/modules/produto')

mongoose.connect('mongodb://<aribeiro>:<aribeiro123>@ds251210.mlab.com:51210/node-api-crud')

app.use(bodyParser.urlencoded({
 extended: true
}))
app.use(bodyParser.json())

var port = process.env.port || 8000

var router = express.Router()

router.get('/', function (req, res) {
 res.json({
  message: 'Beleza!'
 })
})

app.use('/api', router)

app.listen(port)
console.log('Iniciando a api na porta ' + port)