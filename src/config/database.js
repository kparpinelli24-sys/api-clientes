
// Importar dotenv e carregar variáveis do arquivo .env
require('dotenv').config();

// Importar o Pool do PostgreSQL
const { Pool } = require('pg');


const pool = new Pool({
  // process.env.NOME_VARIAVEL busca no arquivo .env
  user: process.env.DB_USER,           // Lê DB_USER do .env
  host: process.env.DB_HOST,           // Lê DB_HOST do .env
  database: process.env.DB_NAME,       // Lê DB_NAME do .env
  password: process.env.DB_PASSWORD,   // Lê DB_PASSWORD do .env
  port: parseInt(process.env.DB_PORT), // Lê DB_PORT e converte para número
});


pool.connect((erro, client, release) => {
  if (erro) {
    console.error('❌ Erro ao conectar ao PostgreSQL:', erro.message);
    console.error('💡 Verifique suas credenciais no arquivo .env');
  } else {
    console.log('✅ Conectado ao PostgreSQL!');
    console.log(`📊 Banco: ${process.env.DB_NAME}`);
    console.log(`🏠 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    release();  // Devolver a conexão ao pool
  }
});

const criarTabela = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS clientes (
      id          SERIAL PRIMARY KEY,
      nome        VARCHAR(255) NOT NULL,
      cpf         VARCHAR(14)  UNIQUE NOT NULL,
      telefone    VARCHAR(20),
      email       VARCHAR(255),
      datanasc    DATE,
      rua         VARCHAR(255),
      numeroCasa  VARCHAR(10),
      bairro      VARCHAR(100),
      criado_em   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    await pool.query(sql);
    console.log('✅ Tabela clientes verificada/criada');
  } catch (erro) {
    console.error('❌ Erro ao criar tabela:', erro.message);
  }
};

criarTabela();


module.exports = pool;
