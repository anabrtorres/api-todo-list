require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require('path');

// uri do banco de dados com admin e pass como variáveis de ambiente
const DB_URI =
"mongodb+srv://" +
process.env.DB_USER +
":" +
process.env.DB_PASSWORD +
"@cluster-todo-app.bs2gazf.mongodb.net/?retryWrites=true&w=majority";

// conexão do banco de dados
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
try {
  let db = mongoose.connection;
  db.on("errr", console.error.bind(console, "Erro de conexão com o banco"));
} catch (error) {
  console.log(error);
}

// criação do app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// retorno do endereço raiz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// rotas da api
const router = express.Router();
const tarefasControler = require("./tarefas-controller");

router.get("/tarefas/:id", tarefasControler.buscarTarefa);
router.delete("/tarefas/:id", tarefasControler.excluirTarefa);
router.put("/tarefas/:id", tarefasControler.alterarTarefa);
router.post("/tarefas", tarefasControler.criarTarefa);
router.get("/tarefas", tarefasControler.listarTarefas);

app.use("/", router);

// escuta a porta definida
app.listen(process.env.PORT, () => {
  console.log("");
  console.log("Servidor em execução na porta " + process.env.PORT);
  console.log("Acesse http://" + process.env.HOST + ":" + process.env.PORT);
});
