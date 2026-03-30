// Importar o Express para criar o router
const express = require('express');
const router = express.Router();

// Importar as funções do Controller
const clientesController = require('../controllers/clientesController');

// GET /clientes - Listar todos os clientes
router.get('/', clientesController.listarTodos);

// GET /clientes/nome/:nome - Buscar por nome
router.get('/nome/:nome', clientesController.buscarPornome);

// GET /clientes/:id - Buscar clientes específico por ID
router.get('/:id', clientesController.buscarPorId);

// POST /clientes - Criar novo clientes
router.post('/', clientesController.criar);

// PUT /clientes/:id - Atualizar clientes completo
router.put('/:id', clientesController.atualizar);

// DELETE /clientes/:id - Deletar clientes
router.delete('/:id', clientesController.deletar);

module.exports = router;
