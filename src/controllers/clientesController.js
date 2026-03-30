// Importar as funções do Model
const clientesModel = require('../models/clientesModel');

// ============================================================
// FUNÇÃO: listarTodos (ASSÍNCRONA)
// ROTA: GET /clientes
// DESCRIÇÃO: Lista todos os clientes do banco de dados
// ============================================================
async function listarTodos(req, res) {
  try {
    const clientes = await clientesModel.listarTodos();
    res.status(200).json(clientes);
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao listar clientes',
      erro: erro.message
    });
  }
}

async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: 'ID inválido'
      });
    }

    const clientes = await clientesModel.buscarPorId(id);

    if (clientes) {
      res.status(200).json(clientes);
    } else {
      res.status(404).json({
        mensagem: `clientes ${id} não encontrado`
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao buscar clientes',
      erro: erro.message
    });
  }
}

async function criar(req, res) {
  try {
    const { nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro } = req.body;

    // Validações
    if (!nome || !cpf || !telefone || !email || !datanasc || !rua || !numeroCasa || !bairro) {
      return res.status(400).json({
        mensagem: 'Todos os campos são obrigatórios'
      });
    }

    const novoclientes = await clientesModel.criar({
      nome,
      cpf,
      telefone,
      email,
      datanasc,
      rua,
      numeroCasa,
      bairro

    });

    res.status(201).json(novoclientes);
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao criar clientes',
      erro: erro.message
    });
  }
}
async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: 'ID inválido'
      });
    }

    if (!nome || !cpf || !telefone || !email || !datanasc || !rua || !numeroCasa || !bairro) {
      return res.status(400).json({
        mensagem: 'Todos os campos são obrigatórios'
      });
    }

    const clientesAtualizado = await clientesModel.atualizar(id, {
      nome,
      cpf,
      telefone,
      email,
      datanasc,
      rua,
      numeroCasa,
      bairro

    });

    if (clientesAtualizado) {
      res.status(200).json(clientesAtualizado);
    } else {
      res.status(404).json({
        mensagem: `clientes ${id} não encontrado`
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao atualizar clientes',
      erro: erro.message
    });
  }
}


async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: 'ID inválido'
      });
    }

    const deletado = await clientesModel.deletar(id);

    if (deletado) {
      res.status(200).json({
        mensagem: `clientes ${id} removido com sucesso`
      });
    } else {
      res.status(404).json({
        mensagem: `clientes ${id} não encontrado`
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao deletar clientes',
      erro: erro.message
    });
  }
}

async function buscarPornome(req, res) {
  try {
    const { nome } = req.params;
    const clientes = await clientesModel.buscarPornome(nome);
    res.status(200).json(clientes);
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao buscar clientes por nome',
      erro: erro.message
    });
  }
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPornome
};
