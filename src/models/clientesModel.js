// Importar o pool de conexões do PostgreSQL

const pool = require('../config/database');
async function listarTodos() {
  // PostgreSQL: a query retorna um objeto 'result'
  const result = await pool.query(
    'SELECT * FROM clientes ORDER BY id'
  );
  
  // Os dados ficam em result.rows
  return result.rows;
}
async function buscarPorId(id) {
  const result = await pool.query(
    'SELECT * FROM clientes WHERE id = $1',
    [id]  // O array com os valores dos placeholders
 );
  
  // Retorna o primeiro resultado (ou undefined se não achar)
  return result.rows[0];
};

async function criar(dados) {
  const { nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro} = dados;
  
  // RETURNING * é um recurso do PostgreSQL que retorna
  // o registro inserido automaticamente!
  const sql = `
    INSERT INTO clientes (nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;
  
  // Executar a query com os valores
  const result = await pool.query(
    sql,
    [nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro]
  );
  
  // O clientes inserido com o ID gerado pelo banco
  return result.rows[0];
}

async function atualizar(id, dados) {
  const { nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro } = dados;
  
  // UPDATE com RETURNING * também retorna o registro atualizado
  const sql = `
    UPDATE clientes
    SET nome = $1, cpf = $2, telefone = $3, email = $4, datanasc = $5, rua = $6, numeroCasa = $7, bairro = $8
    WHERE id = $9
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro, id]
  );
  
  // Se não atualizou nenhuma linha, retorna null
  return result.rows[0] || null;
}

async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM clientes WHERE id = $1',
    [id]
  );
  

  return result.rowCount > 0;
}

async function buscarPornome(nome) {
  // ILIKE é o LIKE case-insensitive do PostgreSQL
  // (no SQLite usávamos LIKE normal)
  const sql = 'SELECT * FROM clientes WHERE nome ILIKE $1';
  
  const result = await pool.query(
    sql,
    [`%${nome}%`]  // % = wildcard (qualquer texto)
  );
  
  return result.rows;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPornome
};
