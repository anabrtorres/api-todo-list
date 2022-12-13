const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TarefaSchema = new Schema({
  descricao: { type: String, required: true },
  prazo: { type: Date, required: false, default: Date.now },
  completa: { type: Boolean, required: false, default: false },
});

module.exports = mongoose.model("Tarefas", TarefaSchema);
