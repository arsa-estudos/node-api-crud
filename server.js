var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Produto = require("./app/models/produto");

// mongoose.connect(
//   "mongodb://alane:alane123@ds251210.mlab.com:51210/node-api-crud"
// );
mongoose.connect(
  'mongodb://localhost:27017/node-api-crud'
)

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

var port = process.env.port || 8009;

var router = express.Router();

router.use(function(req, res, next) {
  console.log("Something is happens");
  next();
});

router.get("/", function(req, res) {
  res.json({
    message: "API funcionando perfeitamente!!"
  });
});

router
  .route("/produtos")

  .post(function(req, res) {
    var produto = new Produto();

    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.descricao = req.body.descricao;

    produto.save(function(error) {
      if (error) {
        console.log("erro encontrado: " + error);
        res.send("Erro ao cadastrar o produto: " + error);
      }
      res.json({ message: "Produto cadastrado com sucesso." });
    });
  })

  .get(function(req, res) {
    Produto.find(function(error, produtos) {
      if (error) {
        res.send("Erro ao tentar selecionar todos os produtos. " + error);
      }
      res.json({
        produtos
      });
    });
  });

router
  .route("/produtos/:produto_id")

  .get(function(req, res) {
    Produto.findById(req.params.produto_id, function(error, produto) {
      if (error) {
        res.send("Produto não encontrado. " + error);
      }
      res.json(produto);
    });
  })

  .put(function(req, res) {
    Produto.findById(req.params.produto_id, function(error, produto) {
      if (error) {
        res.send("Produto não encontrado. " + error);
      }
      produto.nome = req.body.nome;
      produto.preco = req.body.preco;
      produto.descricao = req.body.descricao;

      produto.save(function(error) {
        if (error) {
          res.send("erro ao atualizar o produto." + error);
        }
        res.json({
          message: "Produto atualizado com sucesso."
        });
      });
    });
  })

  .delete(function (req, res) {
    Produto.remove({
      _id: req.params.produto_id
    }, function(error){
      if (error){
        res.send("Erro ao remover produto. " + error)
      }
      res.json({message: "Produto excluído com sucesso."})
    })
  })  

app.use("/api", router);

app.listen(port);
console.log("Iniciando a api na porta " + port);
